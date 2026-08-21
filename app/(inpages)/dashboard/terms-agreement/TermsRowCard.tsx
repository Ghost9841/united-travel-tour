function LoadingRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: 7 }).map((_, cell) => (
            <td key={cell} className="px-5 py-5">
              <div className="h-4 w-full max-w-[150px] animate-pulse rounded bg-gray-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default LoadingRows;