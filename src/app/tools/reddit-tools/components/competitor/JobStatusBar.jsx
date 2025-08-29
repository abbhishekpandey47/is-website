import session from "../../../utils/session";

export default function JobStatusBar(props) {
  // Example: cache job status in session
  session.set('jobStatus', props.status);
  // ...existing code...
}
