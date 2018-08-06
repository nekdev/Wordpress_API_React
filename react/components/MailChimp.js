import Link from "next/link";
import Social from "./Social";
const MailChimp = () => (
  <div className="subscribe-me">
    <p className="lead subscribe-text">
      Stay up to date with the latest marketing trends
    </p>
    <form
      action="https://conceptshop.us18.list-manage.com/subscribe/post"
      method="POST"
      className="form-inline"
    >
      <input type="hidden" name="u" value="368122da14d45e0edc6efad88" />
      <input type="hidden" name="id" value="401d2d57d1" />
      <label className="sr-only" htmlFor="MERGE0">
        Username
      </label>
      <div className="input-group mb-2 mr-sm-2">
        <input
          type="mail"
          className="form-control"
          name="MERGE0"
          id="MERGE0"
          placeholder="Email"
          required
        />
      </div>
      <input
        type="submit"
        className="btn btn-outline-light mb-2"
        name="submit"
        value="Subscribe"
      />
    </form>
  </div>
);

export default MailChimp;
