import Loading from "@/navigation/Loading"
import axios from "axios"
import { useState } from "react"
import nookies from "nookies"
interface IModalDeleteComponentProps {
  showDeleteModal: boolean
  handleCloseDeleteModal: Function
  handleSuccessCloseDeleteModal: Function
  itemId: number
  itemName?: string // Changed to optional
  fieldName1?: string
  fieldName2?: string
  apiNameUrl: string
  width?: string
  height?: string
}

const ModalDeleteComponent: React.FunctionComponent<
  IModalDeleteComponentProps
> = ({
  showDeleteModal,
  handleCloseDeleteModal,
  handleSuccessCloseDeleteModal,
  itemId,
  itemName,
  fieldName1,
  fieldName2,
  apiNameUrl,
  width = "w-6/12 max-w-5xl",
  height = "",
}) => {
  const [loading, setLoading] = useState(false)
  const token = nookies.get(null).accessToken || ""
  const confirmDelete = async () => {
    setLoading(true)
    // console.log("Item id coming is ",itemId, " and api coming is ",apiNameUrl)
    const deletePayload = { Id: itemId }
    // console.log("Data coming is ",deletePayload);

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/${apiNameUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: deletePayload,
      })
      .then((_res) => {
        console.log("Response coming is ", _res.data)
        handleSuccessCloseDeleteModal(false)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle hidden"
        defaultChecked={showDeleteModal}
      />
      <div className="modal modal-middle">
        <div className={`modal-box ${width} ${height}`}>
          <h3 className="font-bold text-lg text-error mb-2">Delete</h3>
          {itemName && (
            <h3 className="font-bold text-lg">
              {`${itemName} - ${itemId}`}
              {fieldName1 && `(${fieldName1})`}
            </h3>
          )}
          <div className="py-4">Are you sure do you want to delete ?</div>
          {loading && <Loading />}
          <div className="modal-action">
            <button
              className="btn btn-error btn-outline btn-sm text-base-100"
              onClick={() => handleCloseDeleteModal(false)}
              disabled={loading}
            >
              Close
            </button>
            <button
              className="btn btn-primary btn-outline btn-sm text-base-100"
              onClick={confirmDelete}
              disabled={loading}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDeleteComponent
