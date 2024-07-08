import React, { useState } from "react";
import { TbGift } from "react-icons/tb";
import { PiPizza } from "react-icons/pi";
import { BsSuitcase2 } from "react-icons/bs";
import { MdOutlineCategory, MdOutlineEdit } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import Form from "./Form";
import { editExpensesForm } from "../constants/form";
import { deleteExpense } from "../utils/ExpenseUtils";
import usePagination from "../hook/usePagination";

const PaginatedList = ({ list }) => {
  const { range, currentPage, nextPage, prevPage, isLastPage, isFirstPage } =
    usePagination(list.length);
  return (
    <div className="paginatedList">
      <List listItems={list.slice(range[0], range[1])} />
      <Pagination
        currentPage={currentPage}
        onClickNext={nextPage}
        onClickPrev={prevPage}
        hidePrev={isFirstPage}
        hideLast={isLastPage}
      />
    </div>
  );
};

const List = ({ listItems }) => {
  return (
    <div
      style={{
        marginBlock: "1rem",
      }}
    >
      {listItems.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const ListItem = ({ item }) => {
  const [showForm, setShowForm] = useState(false);
  const popUpForm = () => {
    setShowForm(true);
  };
  return (
    <div
      className="d-flex-center"
      style={{
        borderBottom: "1px solid var(--grey-color)",
        padding: "1.5rem .5rem .5rem .5rem",
        gap: "1rem",
      }}
    >
      <div
        className="d-flex-center"
        style={{
          flexGrow: "1",
          gap: "1rem",
        }}
      >
        <div
          className="d-flex-center"
          style={{
            background: "var(--grey-light-color)",
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <CategoryIcon icon={item.category} />
        </div>

        <div
          style={{
            textAlign: "left",
            flexGrow: "1",
            fontWeight: "400",
            fontFamily: "Open Sans",
            textTransform: "capitalize",
          }}
        >
          <p style={{ marginBottom: "0" }}>{item.title} </p>
          <p style={{ marginTop: "0", color: "var( --grey-color)" }}>
            {item.date}
          </p>
        </div>
        <p
          style={{
            fontWeight: "700",
            fontFamily: "Open Sans",
            color: "var( --orange-light-color)",
          }}
        >
          {item.price && `₹${item.price}`}
        </p>
      </div>
      <div className="d-flex-center">
        <button
          className="icon-btn"
          style={{
            background: "var(--red-color)",
          }}
          onClick={() => {
            deleteExpense(item.id);
          }}
        >
          <ImCancelCircle color="white" />
        </button>
        <button
          className="icon-btn"
          style={{
            background: "var(--yellow-color)",
          }}
          onClick={() => popUpForm()}
        >
          <MdOutlineEdit color="white" />
        </button>
      </div>
      {showForm && (
        <Form
          data={editExpensesForm}
          setShowForm={setShowForm}
          initial={item}
        />
      )}
    </div>
  );
};
const CategoryIcon = ({ icon }) => {
  if (!icon) return <MdOutlineCategory />;

  const categories = {
    Food: <PiPizza />,
    Entertainment: <TbGift />,
    Travel: <BsSuitcase2 />,
  };
  return categories[icon];
};
const Pagination = ({
  currentPage,
  onClickNext,
  onClickPrev,
  hidePrev,
  hideLast,
}) => {
  return (
    <div className="d-flex-center" style={{ padding: ".5rem" }}>
      <button className="icon-btn" onClick={onClickPrev} disabled={hidePrev}>
        <HiMiniArrowLongLeft />
      </button>
      <p
        style={{
          backgroundColor: "var(--green-dark-color)",
          borderRadius: "15%",
          padding: "1rem ",
          color: "white",
          fontWeight: "400",
        }}
      >
        {currentPage}
      </p>
      <button className="icon-btn" onClick={onClickNext} disabled={hideLast}>
        <HiMiniArrowLongRight />
      </button>
    </div>
  );
};
export default PaginatedList;
