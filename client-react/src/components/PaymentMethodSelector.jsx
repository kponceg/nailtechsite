export default function PaymentMethodSelector({
    selectedMethod,
    OnSelect,
    disabled = false
}) {
    return (
        <fieldset
          className="payment-method-selector"
          >
            <legend>How would you like to pay?</legend>

            <label
              className={`payment-option ${
                selectedMethod === "square"
                ? "payment-option--selected"
                : ""
              }`}
            >
                <input
                type="radio"
                name="paymentMethod"
                value="square"
                checked={selectedMethod === "square"}
                onChange={() => onselect("square")}
                />

                <span>
                    <strong>Credit or debit card</strong>
                    <small>Secure payment powered by Square</small>
                </span>
            </label>

            <label
                className={`payment-option ${
                    selectedMethod === "klarna"
                    ? "payment-option--selected"
                    : ""
                }`}
            >
                <input 
                  type="radio"
                  name="paymentMethod"
                  value="klarna"
                  checked={selectedMethod === "klarna"}
                  onChange={() => onselect("klarna")}
                />

                <span>
                  <strong>Klarna</strong>
                  <small>
                    Pay now or use available flexible payment options
                  </small>
                </span>
            </label>
          </fieldset>
    );
}