const cashbackAmount = document.getElementById('cashback-amount');
const currBalance = document.getElementById('current-balance');
const transContainer = document.getElementById('transactions');

// Dummy data handling
const rewardsData = {
    totalCashback: 500,
    availableBalance: 300,
    transactions: [
        {
            date: '2024-09-06',
            amountEarned: 84.00,
            bookingDetails: 'BK-987654321'
        },
        {
            date: '2024-06-18',
            amountEarned: 75.50,
            bookingDetails: 'BK-678912345'
        },
        {
            date: '2023-11-30',
            amountEarned: 50.00,
            bookingDetails: 'BK-123456789'
        }
        // to add as more transactions as needed
    ]
};
// Destructure rewardsData obj
const {totalCashback, availableBalance, transactions} = rewardsData;

cashbackAmount.textContent = `$${totalCashback.toFixed(2)}`;
currBalance.textContent = `$${availableBalance.toFixed(2)}`;

// Update progressbar percentile
const progressFill = document.querySelector('.progress-fill');
const percentile = (availableBalance / totalCashback) * 100;
progressFill.style.color = '#fff'
progressFill.style.width = `${percentile}%`;
progressFill.textContent = `${percentile}%`;

// Cashback or transactions history
transactions.forEach(transaction => {
    const transItem = document.createElement('div');
    transItem.classList.add('trans-items');
    transItem.innerHTML = `
        <div class="trans-date item">Transaction Date: <span>${transaction.date}</span></div>
        <div class="amount-earned item">Amount Earned: <span>$${transaction.amountEarned.toFixed(2)}</span></div>
        <div class="booking-details item">Booking Details: <span>${transaction.bookingDetails}</span></div>
    `;
    transContainer.appendChild(transItem);
});

// Modal handlings
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-contents');

const showModal = (mode) => {
    if (mode === 'bank') {
        modalContent.innerHTML = `
            <h3>Cashout to Bank Account</h3>
            <p>Enter the amount you wish to withdraw:</p>
            <input type="number" id="withdraw-amount" max="${availableBalance}" />
            <button id="confirm-withdraw">Confirm</button>
            <button id="close-modal">Cancel</button>
        `;
    } else if (mode === 'promo') {
        modalContent.innerHTML = `
            <h3>Convert to Promo Code</h3>
            <p>Enter the amount you wish to convert:</p>
            <input type="number" id="promo-amount" max="${availableBalance}" />
            <button id="confirm-promo">Confirm</button>
            <button id="close-modal">Cancel</button>
        `;
    }

    modalOverlay.classList.add('active');

    // Add event listener for modal btns
    document.getElementById('close-modal').addEventListener('click', closeModal);
    if (mode === 'bank') {
        document.getElementById('confirm-withdraw').addEventListener('click', bankWithdrawal);
    } else if (mode === 'promo') {
        document.getElementById('confirm-promo').addEventListener('click', promoConversion);
    }
}

const closeModal = () => {
    modalOverlay.classList.remove('active');
}

// Cashout options buttons
const toBankBtn = document.getElementById('cashout-bank');
const toPromoBtn = document.getElementById('convert-promo');

toBankBtn.addEventListener('click', () => {
    showModal('bank');
});

toPromoBtn.addEventListener('click', () => {
    showModal('promo');
});

// Modal user actions
const bankWithdrawal = () => {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    if (amount > 0 && amount <= availableBalance) {
        availableBalance -= amount;
        makeUpdate();
        closeModal();
        alert(`$${amount.toFixed(2)} has been withdrawn to your bank account.`);
    } else {
        alert('Invalid amount.');
    }
}

const promoConversion = () => {
    const amount = parseFloat(document.getElementById('promo-amount').value);
    if (amount > 0 && amount <= availableBalance) {
        availableBalance -= amount;
        makeUpdate();
        closeModal();
        alert(`$${amount.toFixed(2)} has been converted to a promo code.`);
    } else {
        alert('Invalid amount.');
    }
}

const makeUpdate = () => {
    document.getElementById('current-balance').textContent = `$${availableBalance.toFixed(2)}`;
    percentile = (availableBalance / totalCashback) * 100;
    progressFill.style.width = `${percentile}%`;
    progressFill.textContent = `${percentile}%`;
}