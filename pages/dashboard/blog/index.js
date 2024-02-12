import { PencilSquare, Trash } from "@styled-icons/bootstrap";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import ImageLoader from "~/components/Image";
import classes from "~/components/tableFilter/table.module.css";
import { cpf, deleteData, fetchData } from "~/lib/clientFunctions";

const DataTable = dynamic(() => import("react-data-table-component"));
const FilterComponent = dynamic(() => import("~/components/tableFilter"));
const GlobalModal = dynamic(() => import("~/components/Ui/Modal/modal"));
const Spinner = dynamic(() => import("~/components/Ui/Spinner"));

const ProductList = () => {
  const url = `/api/blog`;
  const { data, error, mutate } = useSWR(url, fetchData);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    if (data && data.product) {
      setProductList(data.product);
    }
  }, [data]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;

  const { session } = useSelector((state) => state.localSession);
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    setPermissions(cpf(session, "product"));
  }, [session]);

  const openModal = (id) => {
    setSelectedProduct(id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteProduct = async () => {
    setIsOpen(false);
    await deleteData(`/api/blog/delete/${selectedProduct}`)
      .then((data) =>
        data.success
          ? (toast.success("Blog Deleted Successfully"), mutate())
          : toast.error("Something Went Wrong")
      )
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = productList.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Blog Id",
      selector: (row) => row.blogId,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <ImageLoader
          src={row.image[0].url}
          alt={data.name}
          width={55}
          height={80}
        />
      ),
    },
    // {
    //   name: "Product Type",
    //   selector: (row) => row.type.toUpperCase(),
    //   sortable: true,
    // },
    {
      name: "Description",
      selector: (row) => row.shortDescription,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          {permissions.delete && (
            <div className={classes.button} onClick={() => openModal(row._id)}>
              <Trash width={20} height={20} title="DELETE" />
            </div>
          )}
          {permissions.edit && (
            <Link href={`/dashboard/blog/${row.slug}`}>
              <div className={classes.button}>
                <PencilSquare width={20} height={20} title="EDIT" />
              </div>
            </Link>
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "75px",
        fontSize: "14px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <>
      {error ? (
        <div className="text-center text-danger">failed to load</div>
      ) : !data ? (
        <Spinner />
      ) : (
        <div>
          <h4 className="text-center pt-3 pb-3">Blogs</h4>
          <div className={classes.container}>
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              customStyles={customStyles}
            />
            <GlobalModal
              isOpen={isOpen}
              handleCloseModal={closeModal}
              small={true}
            >
              <div className={classes.modal_icon}>
                <Trash width={90} height={90} />
                <p>Are you sure, you want to delete?</p>
                <div>
                  <button
                    className={classes.danger_button}
                    onClick={() => deleteProduct()}
                  >
                    Delete
                  </button>
                  <button
                    className={classes.success_button}
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </GlobalModal>
          </div>
        </div>
      )}
    </>
  );
};

ProductList.requireAuthAdmin = true;
ProductList.dashboard = true;

export default ProductList;