import { Alert, AlertTitle } from "@material-ui/lab";

export default function AlertBar({ errMessage, severity, title }) {
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {errMessage}
    </Alert>
  );
}
