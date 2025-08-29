import session from "../../../utils/session";

export default function CompanySearchControls(props) {
  // Example: cache search controls state in session
  session.set('searchControls', props.controls);
  // ...existing code...
}
