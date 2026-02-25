import React from 'react';
import { Check, X, FileText, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSuccessModal = ({ onClose, transactionId, amount, date }) => {
    return (
        <div className="paymentModalWrapper">
            {/* Overlay with blur effect */}
            <div
                className="successModalOverlay"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="paymentSuccessContent">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="closeModalBtn"
                >
                    <X size={24} />
                </button>

                {/* Header and Status */}
                <div className="paymentStatusHeader">
                    <div className="successIconWrapper">
                        <div className="successIconInner">
                            <Check size={40} className="successCheckIcon" strokeWidth={3} />
                        </div>
                    </div>

                    <h2 className="statusTitle">Payment Successful</h2>
                    <p className="statusMessage">Your payment has been processed successfully</p>
                </div>

                {/* Transaction Details Card */}
                <div className="transactionDetailCard">
                    <div className="transactionInfoContainer">
                        <div className="transactionRow">
                            <span className="transactionLabel">Transaction ID</span>
                            <span className="transactionValue">{transactionId || 'TXN-28645721'}</span>
                        </div>
                        <div className="transactionRow">
                            <span className="transactionLabel">Amount Paid</span>
                            <span className="transactionValue">{amount || 'Rs. 250,000'}</span>
                        </div>
                        <div className="transactionRow">
                            <span className="transactionLabel">Payment Date</span>
                            <span className="transactionValue">{date || '2025/10/26'}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="modalActionButtons">
                    <button className="invoiceDownloadBtn">
                        <FileText size={20} className="mr-2" />
                        Download Invoice
                    </button>

                    <Link to="/" className="backHomeBtn">
                        <Home size={20} className="mr-2" />
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;
