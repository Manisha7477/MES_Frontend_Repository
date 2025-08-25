// import React from "react"

// interface PaginationProps {
//   currentPage: number
//   totalPages: number
//   goToPage: (page: number) => void
//   goToNextPage: () => void
//   goToPreviousPage: () => void
//   itemsPerPage: number
//   setItemsPerPage: (itemsPerPage: number) => void
//   itemsPerPageOptions: number[]
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   goToPage,
//   goToNextPage,
//   goToPreviousPage,
//   itemsPerPage,
//   setItemsPerPage,
//   itemsPerPageOptions,
// }) => {
//   const renderPaginationButtons = () => {
//     const maxPageButtons = 10
//     const halfMaxPageButtons = Math.floor(maxPageButtons / 2)
//     let startPage = currentPage - halfMaxPageButtons
//     let endPage = currentPage + halfMaxPageButtons

//     if (startPage < 1) {
//       startPage = 1
//       endPage = Math.min(maxPageButtons, totalPages)
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages
//       startPage = Math.max(1, totalPages - maxPageButtons + 1)
//     }

//     const pageNumbers = []
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i)
//     }

//     return (
//       <div className="join">
//         <button
//           className="join-item btn btn-xs md:btn:sm btn-primary-content"
//           disabled={currentPage === 1}
//           onClick={() => goToPage(1)}
//         >
//           First
//         </button>
//         <button
//           className="join-item btn btn-xs md:btn:sm btn-primary-content"
//           disabled={currentPage === 1}
//           onClick={goToPreviousPage}
//         >
//           Previous
//         </button>
//         {/* <div className="" >
//         {pageNumbers.map((page) => (
//           <button
//             key={page}
//             className={`join-item btn btn-xs md:btn:sm btn-primary-content ${
//               currentPage === page ? "btn-active" : ""
//             }`}
//             onClick={() => goToPage(page)}
//           >
//             {page}
//           </button>
//         ))}
//         </div> */}
//         <div className="xs:hidden md:block">
//           {pageNumbers.map((page) => (
//             <button
//               key={page}
//               className={`join-item btn btn-xs md:btn:sm btn-primary-content ${
//                 currentPage === page ? "btn-active" : ""
//               }`}
//               onClick={() => goToPage(page)}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//         <button
//           className="join-item btn btn-xs md:btn:sm btn-primary-content"
//           disabled={currentPage === totalPages}
//           onClick={goToNextPage}
//         >
//           Next
//         </button>
//         <button
//           className="join-item btn btn-xs md:btn:sm btn-primary-content"
//           disabled={currentPage === totalPages}
//           onClick={() => goToPage(totalPages)}
//         >
//           Last
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="  flex justify-between items-center gap-2">
//       <select
//         className="border-2"
//         value={itemsPerPage}
//         onChange={(e) => setItemsPerPage(Number(e.target.value))}
//       >
//         {itemsPerPageOptions.map((pageSize) => (
//           <option key={pageSize} value={pageSize}>
//             {pageSize}
//           </option>
//         ))}
//       </select>
//       {renderPaginationButtons()}
//       <div className="flex items-center">
//         <span className="text-xs md:text-base">Go to page:&nbsp;</span>
//         <input
//           type="number"
//           value={currentPage}
//           onChange={(e) => goToPage(Number(e.target.value))}
//           className="flex justify-center  border rounded"
//           style={{ width: "2rem" }}
//         />
//       </div>
//     </div>
//   )
// }

// export default Pagination

import React, { useState, useEffect } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  itemsPerPage: number
  setItemsPerPage: (itemsPerPage: number) => void
  itemsPerPageOptions: number[]
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  itemsPerPage,
  setItemsPerPage,
  itemsPerPageOptions,
}) => {
  const [pageInput, setPageInput] = useState(currentPage.toString())

  useEffect(() => {
    setPageInput(currentPage.toString()) // Sync input with current page
  }, [currentPage])

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPageInput(value) // Allow empty input

    const pageNumber = Number(value)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      goToPage(pageNumber)
    }
  }

  const renderPaginationButtons = () => {
    const maxPageButtons = 10
    const halfMaxPageButtons = Math.floor(maxPageButtons / 2)

    let startPage = Math.max(1, currentPage - halfMaxPageButtons)
    let endPage = Math.min(totalPages, currentPage + halfMaxPageButtons)

    if (endPage - startPage + 1 < maxPageButtons) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageButtons + 1)
      }
    }

    const pageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="join">
        <button
          className="join-item btn btn-xs md:btn-sm btn-primary-content"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
        >
          First
        </button>
        <button
          className="join-item btn btn-xs md:btn-sm btn-primary-content"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          Previous
        </button>

        {startPage > 1 && <span className="px-1">...</span>}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`join-item btn btn-xs md:btn-sm btn-primary-content ${
              currentPage === page ? "btn-active" : ""
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && <span className="px-1">...</span>}

        <button
          className="join-item btn btn-xs md:btn-sm btn-primary-content"
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          Next
        </button>
        <button
          className="join-item btn btn-xs md:btn-sm btn-primary-content"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
        >
          Last
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center gap-2">
      {/* Items per page dropdown */}
      <select
        className="border-2"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
      >
        {itemsPerPageOptions.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>

      {renderPaginationButtons()}

      {/* Page number input */}
      <div className="flex items-center">
        <span className="text-xs md:text-base">Go to page:&nbsp;</span>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageChange}
          className="flex justify-center border rounded text-center"
          style={{ width: "3rem" }}
        />
      </div>
    </div>
  )
}

export default Pagination
