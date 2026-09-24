export default function Toggle({ toggle, setToggle }) {
  return (
    <div className="flex justify-center gap-5 p-5 mb-10  uppercase text-[11px] leading-[1]">
      <div className=" flex gap-3 bg-zinc-100 p-1 rounded cursor-pointer">
        <div
          className={
            toggle == "Clear"
              ? "p-3 px-4 rounded text-zinc-700 bg-white shadow-sm"
              : "p-3 px-4 rounded "
          }
          onClick={() => setToggle("Clear")}
        >
          Clear
        </div>
        <div
          className={
            toggle == "Dark"
              ? "p-3 px-4 rounded text-zinc-700 bg-white shadow-sm"
              : "p-3 px-4 rounded "
          }
          onClick={() => setToggle("Dark")}
        >
          Dark
        </div>
        <div
          className={
            toggle == "Archive"
              ? "p-3 px-4 rounded text-zinc-700 bg-white shadow-sm"
              : "p-3 px-4 rounded "
          }
          onClick={() => setToggle("Archive")}
        >
          Archive
        </div>
      </div>
    </div>
  )
}
