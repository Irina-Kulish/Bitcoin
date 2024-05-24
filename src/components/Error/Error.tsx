interface ErrorProps {
  error: Error | string;
}
  
export const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className="error-message">
      <p>Oops! Something went wrong.</p>
      <p>{errorMessage}</p>
    </div>
  );
};
