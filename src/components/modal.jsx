import PropTypes from "prop-types";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-8 py-14 rounded shadow-lg w-full max-w-lg mx-auto">
        <button
          className="absolute top-0 right-0 m-3 text-4xl font-bold text-black mt-20"
          onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
