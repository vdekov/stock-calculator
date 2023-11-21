import './styles.css';
import { useRef } from 'react';
import { noop } from '@/utils';
import { formatDate, formatTime } from '@/utils/date';
import { inputDatePlaceholder, inputTimePlaceholder } from './constants';

type Props = {
  defaultValue: Date;
  minDate?: string;
  maxDate?: string;
  isValid?: boolean;
  onChange?: (date: Date) => void;
};

export const InputDateTime: React.FC<Props> = ({ defaultValue, minDate, maxDate, isValid = true, onChange = noop }) => {
  const initialDate = formatDate(defaultValue);
  const initialTime = formatTime(defaultValue);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const onInputChange = () => {
    onChange(new Date(`${dateInputRef.current?.value} ${timeInputRef.current?.value}`));
  };

  return (
    <div className={`wrapper-date-time ${isValid ? '' : 'invalid'}`}>
      <label>
        📆&nbsp;Date&nbsp;
        <input
          ref={dateInputRef}
          className="input-date-time"
          type="date"
          defaultValue={initialDate}
          min={minDate}
          max={maxDate}
          placeholder={inputDatePlaceholder}
          onChange={onInputChange}
          data-testid="input-date"
        />
      </label>
      <label>
        🕗&nbsp;Time (24h)&nbsp;
        <input
          ref={timeInputRef}
          className="input-date-time"
          type="time"
          defaultValue={initialTime}
          step="1"
          placeholder={inputTimePlaceholder}
          onChange={onInputChange}
          data-testid="input-time"
        />
      </label>
    </div>
  );
};
