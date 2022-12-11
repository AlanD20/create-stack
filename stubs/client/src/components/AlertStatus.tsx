import { useEffect } from 'react';
import { clearAlert } from '@/features/alertSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';

interface Props {
  className?: string;
}

const AlertStatus = ({ className = '' }: Props) => {
  const dispatch = useAppDispatch();
  const { success, error } = useAppSelector((state) => state.alert);
  // const success = "error";

  useEffect(() => {
    const timer = setTimeout(() => void dispatch(clearAlert()), 1400);
    return () => void clearTimeout(timer);
  }, [dispatch, error, success]);

  if (!error && !success) return <></>;

  return (
    <div
      className={`my-4 flex flex-col justify-center gap-4 font-semibold text-lg ${className}`}
    >
      {error && (
        <span className="alert alert-error text-white shadow-lg py-2 text-base flex flex-col gap-2">
          {!Array.isArray(error)
            ? error
            : error.map((err, i) => <span key={i}>{err}</span>)}
        </span>
      )}
      {success && (
        <span className="alert alert-success text-white shadow-lg py-2 text-base">
          {success}
        </span>
      )}
    </div>
  );
};

export default AlertStatus;
