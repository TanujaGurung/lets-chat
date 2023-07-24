const { Fragment, useState } = require("react");

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errorFields, setErrorFields] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  const callApi = async (err) => {
    setLoading(true);
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonRes = await res.json();
      console.log("res", jsonRes);
      if (jsonRes) {
        alert("mail has been sent successfully with id " + jsonRes);
        setStatusMessage("Thank you for contacting us !!");
        setLoading(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      console.log("err");
    }
  };
  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "fullName") {
      e.preventDefault();
      const re = /^[a-z\u0590-\u05fe\s]+$/i;
      if (value === "" || re.test(value)) {
        setFormData((values) => ({ ...values, [name]: value }));
      }
    } else if (name === "phone") {
      const reg = /^\d+$/;
      if (value === "" || reg.test(value)) {
        setFormData((values) => ({ ...values, [name]: value }));
      }
    } else {
      setFormData((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (formData.fullName === "" || !/\S/.test(formData.fullName)) {
      if (!errorFields.includes("fullName"))
        setErrorFields((prevState) => [...prevState, "fullName"]);
    } else {
      setErrorFields(arrayRemove(errorFields, "fullName"));
    }

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (formData.email === "" || !formData.email.match(emailRegex)) {
      if (!errorFields.includes("email"))
        setErrorFields((prevState) => [...prevState, "email"]);
    } else {
      setErrorFields(arrayRemove(errorFields, "email"));
    }

    if (formData.subject === "" || !/\S/.test(formData.subject)) {
      if (!errorFields.includes("subject"))
        setErrorFields((prevState) => [...prevState, "subject"]);
    } else {
      setErrorFields(arrayRemove(errorFields, "subject"));
    }

    if (formData.message === "" || !/\S/.test(formData.message)) {
      if (!errorFields.includes("message"))
        setErrorFields((prevState) => [...prevState, "message"]);
    } else {
      setErrorFields(arrayRemove(errorFields, "message"));
    }

    const testPass =
      formData.fullName !== "" &&
      /\S/.test(formData.fullName) &&
      formData.email !== "" &&
      formData.email.match(emailRegex) &&
      formData.subject !== "" &&
      /\S/.test(formData.subject) &&
      formData.message !== "" &&
      /\S/.test(formData.message);
    if (testPass) {
      setErrorFields([]);
      callApi();
    } else {
      return;
    }
  };
console.log("error", errorFields)
  return (
    <Fragment>
      <h1>Contact Us</h1>
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName"> Name</label>
          <input
            className={
              errorFields.includes("fullName") ? "error-fields" : "input-fields"
            }
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            maxLength="50"
            placeholder="Name.."
            onChange={(e) => handleInput(e)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            className={
              errorFields.includes("email") ? "error-fields" : "input-fields"
            }
            type="email"
            id="email"
            name="email"
            placeholder="email.."
            maxLength="50"
            value={formData.email}
            onChange={(e) => handleInput(e)}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            className="input-fields"
            type="text"
            maxLength="30"
            id="phone"
            name="phone"
            placeholder="phone number.."
            value={formData.phone}
            onChange={(e) => handleInput(e)}
          />
          <label htmlFor="subject">Subject</label>
          <input
            className={
              errorFields.includes("subject") ? "error-fields" : "input-fields"
            }
            type="text"
            maxLength="50"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => handleInput(e)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            className={
              errorFields.includes("message") ? "error-fields" : "input-fields"
            }
            id="message"
            name="message"
            maxLength="500"
            placeholder="you can enter 500 character.."
            style={{ height: "200px" }}
            value={formData.message}
            onChange={(e) => handleInput(e)}
            required
          ></textarea>
          {errorFields.length !== 0 && (
            <div className="error-block">
              {errorFields.map((item, id) => {
                return <p key={id}>kindly enter valid {item}</p>;
              })}
            </div>
          )}
          {statusMessage !== "" && (
            <div className="success-div">{statusMessage}</div>
          )}

          <input type="button" value="Submit" onClick={handleSubmit} />
        </form>
        {loading && <div className="semiTransparenDiv" />}
      </div>
    </Fragment>
  );
};
export default ContactForm;
