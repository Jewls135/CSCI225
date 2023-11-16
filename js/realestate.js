// Variables

// Functions
function calcLoanInfo(){

    $('#loanInput').hide(); // Hide input div when called

    // Constants
    const startMonth = document.getElementById("startMonth").options[document.getElementById("startMonth").selectedIndex].value;
    const startYear = parseFloat(document.getElementById("startYear").options[document.getElementById("startYear").selectedIndex].value);
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value)/100;
    const loanTerm = parseFloat(document.getElementById("loanTerm").value);
    const loanTermMonth = loanTerm * 12;
    const monthlyInterest = interestRate / 12;
    const monthlyPayment = loanAmount * (monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -loanTermMonth));
    var tableOutput = "<table><tr id = \"headtr\"><td>Date</td><td>Interest</td><td>Principal</td><td>Balance</td></tr>";
    var balance = loanAmount;

    for(var i = 0; i < loanTerm; i++){

        // Yearly variables (outputs)
        var annualInterestPaid = 0;
        var annualPrincipalPaid = 0;
        for(var j = 0; j < 12; j++){
            // Calculations below
            var interestPerMonth = balance * monthlyInterest;
            var principalPerMonth = monthlyPayment - interestPerMonth;
            balance-= principalPerMonth;
            annualInterestPaid += interestPerMonth;
            annualPrincipalPaid += principalPerMonth;
        } // End of inner for

        tableOutput += "<tr><td>" + (startYear + i) + "</td><td>" + Math.floor(annualInterestPaid*100)/100 + "</td><td>" +
        Math.floor(annualPrincipalPaid*100)/100 + "</td><td>" + Math.floor(balance*100)/100 + "</tr>";
        console.log(i + balance);
    } // End of outer for

    tableOutput += "</table>";
    $('#loanOutput').html("");
    $('#loanOutput').show();
    $('#loanOutput').html(tableOutput);

} // End of func calcLoan

function openInput(){
    // Resetting inputs to their default values
    $('#loanAmount').val($('#loanAmount').defaultValue);
    $('#interestRate').val($('#interestRate').defaultValue);
    $('#loanTerm').val($('#loanTerm').defaultValue);
    $('#startMonth').val($('#startMonth').defaultValue);
    $('#startYear').val($('#startYear').defaultValue);

    // Showing input div and hiding output div
    $('#loanInput').show();
    $('#loanOutput').hide();
}


// Event handlers
document.getElementById("calculate").addEventListener('click', calcLoanInfo, false);
document.getElementById("loan").addEventListener('click', openInput, false);

calcLoanInfo;