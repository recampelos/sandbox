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

  readonly loadTechnicalSheetVisibility$ = this.effect(
    (input$: Observable<{subLimitCode: string, productCode: string, technicalSheetCode: string | undefined}>) => {
      return input$.pipe(
        switchMap(({subLimitCode, productCode, technicalSheetCode}) => this.technicalSheetService.getTechnicalSheetVisibility(subLimitCode, productCode, technicalSheetCode)),
        tap({
          next: () => this.updater((state, visibility: TechnicalSheetVisibility) => ({...state, technicalSheetVisibility: visibility})),
          error: (e) => console.error(e)
        }),
        catchError(() => EMPTY)
      )
    }
  )

  readonly loadTechnicalSheet$ = this.effect(
    (input$: Observable<{technicalSheetCode: string}>) => {
      return input$.pipe(
        switchMap(({technicalSheetCode}) => this.technicalSheetService.getTechnicalSheet(technicalSheetCode)),
        tap({
          next: () => this.updater((state, technicalSheet: TechnicalSheet) => ({...state, technicalSheet})),
          error: (e) => console.error(e)
        }),
        catchError(() => EMPTY)
      )
    }
  )

  readonly updateGeneralConditions$ = this.effect(
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
