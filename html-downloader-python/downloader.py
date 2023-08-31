from htmldom import htmldom
from pathlib import Path
import tqdm
import re
import requests
import os.path

source = 'http://archive.org/download/xbox_eng_romset'
target = 'C:\\Xbox\\T'
filter = '^T.*\\.7z$'
excludeFilter = '^(NCAA|NFL).*\\.7z$'

def download(url: str, filename: str, total: int = None, resume_byte_pos: int = None):
    dest = target + '\\' + fileName

    if not total:
        resp = requests.head(url, allow_redirects=True)
        total = int(resp.headers.get('content-length', 0))

    initial_pos = resume_byte_pos if resume_byte_pos else 0
    mode = 'ab' if resume_byte_pos else 'wb'
    resume_header = ({'Range': f'bytes={resume_byte_pos}-'}
                     if resume_byte_pos else None)

    print(fileName)
    with open(dest, mode) as f:
        with requests.get(url, stream=True, headers=resume_header) as r:
            r.raise_for_status()

            # tqdm has many interesting parameters. Feel free to experiment!
            tqdm_params = {
                'desc': '',
                'total': total,
                'miniters': 1,
                'unit': 'B',
                'unit_scale': True,
                'unit_divisor': 1024,
                'initial': initial_pos
            }
            with tqdm.tqdm(**tqdm_params) as pb:
                for chunk in r.iter_content(chunk_size=8192):
                    pb.update(len(chunk))
                    f.write(chunk)

def downloadFile(url: str, fileName: str):
    # get download size
    r = requests.head(url, allow_redirects=True)
    downloadSize = int(r.headers.get('content-length', 0))
    # get file size
    dest = target + '\\' + fileName

    print("------------------------------------------------------")

    if os.path.exists(dest):
        fileSize = Path(dest).stat().st_size

        if fileSize < downloadSize:
            download(url, fileName, downloadSize, fileSize)
        else:
            print(fileName + " completed")
    else:
        download(url, fileName, downloadSize)
    


dom = htmldom.HtmlDom(source)
dom.createDom()
links = dom.find('table.directory-listing-table tr td a')

for link in links:
    fileName = link.text()
    href = link.attr("href")
    match = re.search(filter, fileName)
    exclude = re.search(excludeFilter, fileName)

    if match and not exclude:
        downloadUrl = source + "/" + href
        downloadFile(downloadUrl, fileName)
        