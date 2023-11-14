import { useRef } from 'react';
import { noop } from '../../utils';
import './styles.css';
import { inputDatePattern, inputDatePlaceholder, inputTimePattern, inputTimePlaceholder } from './constants';
import { formatDate, formatTime } from '../../utils/date';

type Props = {
  defaultValue: Date;
  minDate?: string;
  maxDate?: string;
  errorMsg?: string;
  onChange?: (date: Date) => void;
};

// TODO:
// - Add fallback support for older browsers
// - Add client validation
export const InputDateTime: React.FC<Props> = ({ defaultValue, minDate, maxDate, errorMsg, onChange = noop }) => {
  const initialDate = formatDate(defaultValue);
  const initialTime = formatTime(defaultValue);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const onInputChange = () => {
    onChange(new Date(`${dateInputRef.current?.value} ${timeInputRef.current?.value}`));
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
          onChange={onInputChange}
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
          onChange={onInputChange}
        />
        {}
      </label>
      {!!errorMsg && <span className="invalid-date-time">{errorMsg}</span>}
    </div>
  );
};
