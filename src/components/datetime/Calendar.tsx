import "assets/scss/components/calendar.scss";

import React, { useEffect, useState } from "react";
import { useApp, useTheme } from "contexts";
import { Checks } from "helpers";
import { Week } from "components/datetime/Week";
import { Box, IconButton } from "@mui/material";

// icons
import {
  TodayRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";

export type Item = {
  day: number;
  today: boolean;
  selected: boolean;
  disabled: boolean;
};

type Props = {
  min?: Date;
  max?: Date;
  value?: Date;
  locale?: string;
  weekend?: boolean;
  disabled?: boolean;
  rules?: any;
  exceptions?: any;
  onSelect?: (value: Date) => void;
};

export const Calendar = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  const [dates, setDates] = useState<Item[][]>([]);
  const [today, setToday] = useState<Date>(props.value ?? new Date());
  const [day, setDay] = useState<number>(today.getDate());
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selected, setSelected] = useState<Date>();

  useEffect(() => config(), []);

  useEffect(() => {
    if (selected) {
      props.onSelect && props.onSelect(selected);
      setDay(selected?.getDate());
      setMonth(selected?.getMonth());
      setYear(selected?.getFullYear());
      config();
    }
  }, [selected]);

  useEffect(() => config(), [year, month]);

  const monthAsString = new Date(day, month, 1).toLocaleString(props.locale, {
    month: "long",
  });

  const weekdayRange = props.weekend ? [0, 6] : [1, 5];

  function weekdays() {
    const weekdays = [];
    const date = new Date();
    while (date.getDay() !== weekdayRange[0]) date.setDate(date.getDate() - 1);
    for (let i = weekdayRange[0]; i <= weekdayRange[1]; i++) {
      weekdays.push(date.toLocaleString(props.locale, { weekday: "narrow" }));
      date.setDate(date.getDate() + 1);
    }
    return weekdays;
  }

  function days() {
    const days = [];
    const from = new Date(year, month, 1);
    const to = new Date(year, month + 1, 0);

    while (to.getDay() !== weekdayRange[1]) to.setDate(to.getDate() + 1);
    while (from.getDay() !== weekdayRange[0]) from.setDate(from.getDate() - 1);

    while (from < to || Checks.isDateEquals(from, to)) {
      const weekday = from.getDay();
      if (weekday >= weekdayRange[0] && weekday <= weekdayRange[1]) {
        days.push(new Date(from));
      }
      from.setDate(from.getDate() + 1);
    }

    return days;
  }

  function hasBackward() {
    const first = new Date(year, month, 1);
    return props.min
      ? first > props.min || Checks.isDateEquals(first, props.min)
      : true;
  }

  function hasForward() {
    const last = new Date(year, month, 0);
    return props.max
      ? last < props.max || Checks.isDateEquals(last, props.max)
      : true;
  }

  // componentDidUpdate(prevProps: Props) {
  //   if (prevProps.disabled !== props.disabled) {
  //     config();
  //   }
  // }

  function config() {
    const items: Item[][] = [];

    for (const day of days()) {
      const item = {} as Item;

      item.day = day.getDate();
      item.disabled =
        props.disabled ||
        day.getMonth() !== month ||
        !Checks.inRange(day, props.min, props.max) ||
        isException(day);

      if (!item.disabled) {
        item.disabled = false;

        if (Checks.isDateEquals(day, today)) {
          item.today = true;
        }

        if (selected && Checks.isDateEquals(day, selected)) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      }

      if (day.getDay() === weekdayRange[0]) {
        items.push([item]);
      } else {
        items[items.length - 1].push(item);
      }
    }

    setDates(items);
  }

  function isException(date: Date) {
    let exception = false,
      found = false;
    props.exceptions &&
      Object.keys(props.exceptions).forEach((item: string) => {
        if (Checks.isDateEquals(new Date(item), date)) {
          found = true;
          const values: { start: number; end: number } = props.exceptions[item];
          if (values.start === 0) {
            exception = true;
          }
          return false;
        }
      });

    if (props.rules && !found) {
      const values: { start: number; end: number } = props.rules[date.getDay()];
      return values.start === 0;
    }

    return exception;
  }

  function handleSelect(dd: number, mm?: number, yyyy?: number) {
    handleUnselect();
    setSelected(new Date(yyyy ?? year, mm ?? month, dd));
  }

  function handleSelectToday() {
    handleSelect(today.getDate(), today.getMonth());
  }

  function handleUnselect() {
    if (
      selected &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    ) {
      const day = selected.getDate();
      [].concat.apply([], days as any).forEach((item: Item) => {
        if (item.day === day) {
          item.selected = false;
          return false;
        }
      });
    }
  }

  function handleClick(date: Item) {
    handleSelect(date.day);
  }

  function handleArrowClick(value: number) {
    let lmonth: number = month,
      lyear: number = year;
    if (lmonth + value < 0) {
      lmonth = 11;
      lyear--;
    } else if (lmonth + value > 11) {
      lmonth = 0;
      lyear++;
    } else {
      lmonth = lmonth + value;
    }
    setYear(lyear);
    setMonth(lmonth);
  }

  return (
    <Box className="react-calendar" bgcolor={theme.palette.background.color}>
      <Box className="header">
        <Box className="current" color={theme.palette.font.color}>
          <Box className="month">{monthAsString}</Box>
          <Box className="year">{year}</Box>
        </Box>
        <Box className="control" color={theme.palette.font.color}>
          <IconButton
            color="inherit"
            disabled={!hasBackward() || props.disabled}
            onClick={() => handleArrowClick(-1)}
          >
            <KeyboardArrowLeftRounded />
          </IconButton>
          <IconButton
            color="inherit"
            disabled={!hasForward() || props.disabled}
            onClick={() => handleArrowClick(1)}
          >
            <KeyboardArrowRightRounded />
          </IconButton>
          <IconButton
            color="inherit"
            disabled={props.disabled}
            onClick={handleSelectToday}
          >
            <TodayRounded />
          </IconButton>
        </Box>
      </Box>
      <Box className="content">
        <Box className="weekday">
          {weekdays().map((item: string, i: number) => {
            return (
              <Box key={i} className="item" color={theme.palette.font.color}>
                {item}
              </Box>
            );
          })}
        </Box>
        <Box className="month">
          {dates.map((item: Item[], i: number) => {
            return <Week key={i} weeks={item} onClick={handleClick} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

Calendar.defaultProps = {
  weekend: true,
};
