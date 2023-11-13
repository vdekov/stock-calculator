import { useRef } from 'react';
import { noop } from '../../utils';
import './InputDateTime.css';
import { inputDatePattern, inputDatePlaceholder, inputTimePattern, inputTimePlaceholder } from './constants';

type Props = {
  initialDate?: string;
  minDate?: string;
  maxDate?: string;
  initialTime?: string;
  errorMsg?: string;
  onChange?: (date: Date) => void;
};

// TODO:
// - Add fallback support for older browsers
// - Add client validation
export const InputDateTime: React.FC<Props> = ({
  initialDate,
  minDate,
  maxDate,
  initialTime,
  errorMsg,
  onChange = noop,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new Date(`${event.target.value} ${timeInputRef.current?.value}`));
  };

  const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new Date(`${dateInputRef.current?.value} ${event.target.value}`));
  };

  return (
    <div className="wrapper-date-time">
      <label className="label-date-time">
        📆&nbsp;Date:&nbsp;
        <input
          ref={dateInputRef}
          className="input-date-time"
          type="date"
          defaultValue={initialDate}
          min={minDate}
          max={maxDate}
          placeholder={inputDatePlaceholder}
          pattern={inputDatePattern}
          onChange={onDateChange}
        />
      </label>
      <label className="label-date-time">
        🕗&nbsp;Time (24h):&nbsp;
        <input
          ref={timeInputRef}
          className="input-date-time"
          type="time"
          defaultValue={initialTime}
          step="1"
          placeholder={inputTimePlaceholder}
          pattern={inputTimePattern}
          onChange={onTimeChange}
        />
        {}
      </label>
      {!!errorMsg && <span className="invalid-date-time">{errorMsg}</span>}
    </div>
  );
};
