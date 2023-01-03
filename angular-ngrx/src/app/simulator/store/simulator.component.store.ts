import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {initialState, SimulatorState} from "./simulator.store";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, switchMap, tap, withLatestFrom} from "rxjs";
import {TechnicalSheetService} from "../services/technical-sheet.service";
import {
  GeneralConditions,
  GeneralConditionsForm,
  TechnicalSheet,
  TechnicalSheetVisibility
} from "../models/simulator.models";

@Injectable()
export class SimulatorComponentStore extends ComponentStore<SimulatorState> {

  constructor(private technicalSheetService: TechnicalSheetService) {
    super(initialState);
  }

  readonly technicalSheet$: Observable<TechnicalSheet | undefined> = this.select((state) => state?.technicalSheet);

  readonly technicalSheetVisibility$: Observable<TechnicalSheetVisibility | undefined> = this.select((state) => state?.technicalSheetVisibility);

  readonly generalConditions$: Observable<GeneralConditions | undefined> = this.select((state) => state?.technicalSheet?.generalConditions);

  readonly generalConditionsFrom$: Observable<GeneralConditionsForm> = this.select((state) => state?.generalConditionsForm);

  readonly isEditable$: Observable<boolean> = this.select((state) => state.isEditable);

  readonly loadTechnicalSheetVisibility = this.effect(
    (input$: Observable<{subLimitCode: string, productCode: string, technicalSheetCode: string | undefined | null}>) => input$.pipe(
      tap(console.log),
      switchMap(({subLimitCode, productCode, technicalSheetCode}) => this.technicalSheetService.getTechnicalSheetVisibility(subLimitCode, productCode, technicalSheetCode)),
      tap(console.log),
      tap((visibility) => this.setState((state) => {
        return {...state, technicalSheetVisibility: visibility};
      })),
      catchError(() => EMPTY)
    )
  )

  readonly loadTechnicalSheet = this.effect(
    (input$: Observable<{technicalSheetCode: string | null}>) => {
      return input$.pipe(
        switchMap(({technicalSheetCode}) => this.technicalSheetService.getTechnicalSheet(technicalSheetCode)),
        tapResponse(
          () => this.updater((state, technicalSheet: TechnicalSheet) => ({...state, technicalSheet})),
          (e) => console.error(e)
        ),
        catchError(() => EMPTY)
      )
    }
  )

  readonly updateGeneralConditions = this.effect(
    (trigger$) => trigger$.pipe(
      withLatestFrom(this.generalConditionsFrom$),
      switchMap(([,generalConditionsForm]) => this.technicalSheetService.updateGeneralConditions(generalConditionsForm).pipe(
        tapResponse(
          () => console.log('generalConditionsForm updated', generalConditionsForm),
          (e) => console.error(e)
        )
      ))
    )
  )
}
