type Props = {
  label: string;
  maxDate?: string;
};

export const InputDateTime: React.FC<Props> = ({ label, maxDate }) => {
  return (
    <>
      <div>
        <label>
          {label}
          <input type="date" name="trip-start" value="2018-07-22" min="2018-01-01" max={maxDate} required />
        </label>
        <label>
          <input type="time" name="appt" required step="1" />
        </label>
      </div>
    </>
  );
};
