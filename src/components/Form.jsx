import React, { useEffect, useState } from "react";

function Form({ data, setShowForm, initial }) {
  const [form, setForm] = useState(initial ?? {});

  const register = (id) => {
    return {
      controlId: id,
      value: form[id] ?? "",
      onChange: (e) => {
        setForm((prev) => ({ ...prev, [id]: e.target.value }));
      },
    };
  };

  const styleFlex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: ".5rem",
    maxWidth: "42rem",
    marginBlock: "1.2rem",
  };
  const styleGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: ".5rem",
    maxWidth: "42rem",
    marginBlock: "1.2rem",
  };

  return (
    <div className="form-background">
      <div
        style={{
          backgroundColor: "var(--grey-form-bg)",
          padding: "2rem 1rem",
          borderRadius: "1rem",
        }}
      >
        <h2>{data.title}</h2>
        <form style={data.controllers.length > 1 ? styleGrid : styleFlex}>
          {data.controllers.map((control) => (
            <Input
              key={`form-input-${control.id}`}
              type={control.type}
              placeholder={control.placeholder}
              options={control.options}
              {...register(control.id)}
            />
          ))}
          <Button
            onClick={(e) => {
              e.preventDefault();
              data.actionBtn.onClickAction(form);
              setShowForm(false);
            }}
          >
            {data.actionBtn.name}
          </Button>
          <Button
            bgColor={"--gradient-grey"}
            txtColor={"black"}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Form;

export const Input = ({
  type,
  placeholder,
  options,
  value,
  onChange,
  controlId,
}) => {
  switch (type) {
    case "text":
      return (
        <input
          className="form-input"
          id={controlId}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <input
          className="form-input"
          id={controlId}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={0}
        />
      );
    case "drop-down":
      return (
        <DropDown
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={onChange}
        />
      );
    case "date":
      return (
        <input
          className="form-input-date"
          type="date"
          placeholder="dd-mm-yyyy"
          value={value}
          onChange={onChange}
        />
      );
    default:
      return "";
  }
};

export const Button = ({ children, bgColor, txtColor, onClick }) => {
  return (
    <>
      <button
        className="from-button"
        style={{
          borderRadius: "15px",
          padding: "20px 35px",
          fontSize: "16px",
          fontWeight: "700",
          background: `var(${bgColor ?? "--orange-light-color"})`,
          color: `${txtColor ?? "white"}`,
          border: "none",
          boxShadow: "0px 4px 4px 0px #00000040",
          margin: "5px",
          width: "max-content",
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

const DropDown = ({ placeholder, options, value, onChange }) => {
  const [selected, setSelected] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="form-dropdown">
      <input
        className="form-input dropdown-input"
        type="text"
        placeholder={placeholder}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        value={selected}
        onClick={() => {
          setShowOptions((prev) => !prev);
        }}
      />
      {showOptions && (
        <div className="form-dropdown-options">
          {options.map((o) => (
            <Option
              key={o.id}
              value={o.value}
              onClick={() => {
                setSelected(o.value);
                setShowOptions(false);
                onChange({ target: { value: o.value } });
              }}
            >
              {o.name}
            </Option>
          ))}
        </div>
      )}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <p onClick={onClick} className="form-dropdown-option">
      {children}
    </p>
  );
};
