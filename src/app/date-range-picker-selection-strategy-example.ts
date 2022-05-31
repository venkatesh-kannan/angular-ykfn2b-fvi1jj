import { Component, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import moment from 'moment';

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  startDate: any;

  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return new DateRange<D>(this.startDate, null);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      let startDate = 3;
      let endDate = 6;
      if (moment(date).format('ddd').toLowerCase() == 'mon') {
        endDate = 5;
      }
      if (moment(date).format('ddd').toLowerCase() == 'tue') {
        endDate = 4;
      }
      if (moment(date).format('ddd').toLowerCase() == 'fri') {
        endDate = 7;
      }
      const start = this._dateAdapter.addCalendarDays(date, 2);
      const end = this._dateAdapter.addCalendarDays(date, endDate);
      this.startDate = this._dateAdapter.addCalendarDays(date, 0);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

/** @title Date range picker with custom a selection strategy */
@Component({
  selector: 'date-range-picker-selection-strategy-example',
  templateUrl: 'date-range-picker-selection-strategy-example.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class DateRangePickerSelectionStrategyExample {
  constructor() {}
  dateFilter = (d: Date | null): boolean => {
    console.log(d);
    return true;
  };
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
