import { useRef, useState } from "react"

export default function App() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  })

  const [calculatedData, setCalculatedData] = useState({
    day: null,
    month: null,
    year: null,
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        formRef.current.classList.remove("needs-validation")
        formRef.current.classList.add("was-validated")

        calculateAge(formData.day, formData.month, formData.year)
      } else {
        formRef.current.classList.remove("needs-validation")
        formRef.current.classList.add("was-validated")
      }
    }
  }

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const calculateAge = (day, month, year) => {
    const bornDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    let dayDifference = currentDate.getDate() - bornDate.getDate()
    let monthDifference = currentDate.getMonth() - bornDate.getMonth()
    let yearDifference = currentDate.getFullYear() - bornDate.getFullYear();

    if (monthDifference < 0) {
      dayDifference += bornDate.getDate();
      monthDifference += 12;
      yearDifference--;
    } else if (dayDifference < 0) {
      dayDifference += new Date(year, month + 1, 0).getDate();
      monthDifference--;
    }

    setCalculatedData({
      day: dayDifference,
      month: monthDifference,
      year: yearDifference,
    })
  }

  return (
    <div className="container my-4 mx-2">
      <div className="row">
        <div className="rounded-custom my-auto col bg-white">
          <form data-testid="form" ref={formRef} onSubmit={handleSubmit} className="px-1 px-md-5 py-5 container needs-validation" noValidate>
            <div className="row pt-md-fix h-116 gx-2 gx-md-4 padding-end-216">
              <div className="col">
                <label htmlFor="day" className="form-label">DAY</label>
                <input onChange={handleInputChange} min={1} max={31} placeholder="DD" type="number" className="form-control" id="day" value={formData.day} required />
                <div className="mt-1 invalid-feedback fst-italic">
                  Must be a valid day.
                </div>
              </div>
              <div className="col">
                <label htmlFor="month" className="form-label">MONTH</label>
                <input onChange={handleInputChange} min={1} max={12} placeholder="MM" type="number" className="form-control" id="month" value={formData.month} required />
                <div className="mt-1 invalid-feedback fst-italic">
                  Must be a valid month.
                </div>
              </div>
              <div className="col">
                <label htmlFor="year" className="form-label">YEAR</label>
                <input onChange={handleInputChange} min={1} max={new Date().getFullYear()} placeholder="YYYY" type="number" className="form-control" id="year" value={formData.year} required />
                <div className="mt-1 invalid-feedback fst-italic">
                  Must be in the past.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="position-relative col-12">
                <div className="d-flex justify-content-center align-items-center">
                  <hr className="w-full-n2 position-absolute" />
                  <button className="z-10 d-flex justify-content-center align-items-center btn btn-primary rounded-circle" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="row text-row-fix h-358-fix">
              <h1 className="fw-bolder fst-italic mb-0">
                <span className="text-primary">{calculatedData.year ?? '--'}</span>
                years
              </h1>
              <h1 className="fw-bolder fs-7 fst-italic mb-0">
                <span className="text-primary">{calculatedData.month ?? '--'}</span>
                months
              </h1>
              <h1 className="fw-bolder fs-7 fst-italic mb-0">
                <span className="text-primary">{calculatedData.day ?? '--'}</span>
                days
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}