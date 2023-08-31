from htmldom import htmldom
from pathlib import Path
import tqdm
import re
import requests
import os.path

source = 'https://archive.org/download/XBOX-parte1-Arquivista'
target = 'C:\\Xbox\\iso'
filter = '^A.*\\((EU|US|JP)\\)\\.iso$'
excludeFilter = '^(NCAA|NFL).*\\.7z$'

class Download:

    def __init__(self, fileName, downloadUrl):
        self.fileName = fileName
        self.downloadUrl = downloadUrl
    

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
            print(fileName + " to download " + url)
            # download(url, fileName, downloadSize, fileSize)
        else:
            print(fileName + " completed")
    else:
        # download(url, fileName, downloadSize)
        print(fileName + " to download " + url)
    
def hasEuDownload(downloads: list, fileName: str):
    euFileName = fileName.replace('US', 'EU')
    euFileName = fileName.replace('JP', 'EU')

    for download in downloads:
        if fileName.__eq__(download.fileName):
            return True
        
    return False

dom = htmldom.HtmlDom(source)
dom.createDom()
links = dom.find('table.directory-listing-table tr td a')
downloads = []

for link in links:
    fileName = link.text()
    href = link.attr("href")
    match = re.search(filter, fileName)
    exclude = re.search(excludeFilter, fileName)

    if match and not exclude:
        downloadUrl = source + "/" + href
        # downloadFile(downloadUrl, fileName)
        downloads.append({
            name: fileName,
            url: downloadUrl
        })

for download in downloads:
    if hasEuDownload(download.fileName):
        print(download)
        