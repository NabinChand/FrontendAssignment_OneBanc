

api = 'https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2'

fetch(api)
  .then((response) => response.json())
  .then((data) => {

    parent = document.getElementById('trans')

    data.transactions.map((tran) => {

      var direction, tranMsg, tranid = '', src, button = '', date = '';


      if (date === '')
        date = '---------------' + new Date(tran.startDate).toLocaleDateString() + '---------------'
      else
        date = ''

      if (tran.direction === 1) {
        direction = "right"
        if (tran.type === 1) {
          tranMsg = 'You paid'
          tranid = 'Transaction ID<br>' + tran.id
          src = 'Tick.jpg'
        }
        else if (tran.type === 2) {
          tranMsg = 'You requested'
          button = `<button> Cancel </button> `
          src = 'Wait.jpg'
        }
      }
      else if (tran.direction === 2) {
        direction = "left"
        if (tran.type === 1) {
          tranMsg = 'You received'
          tranid = 'Transaction ID<br>' + tran.id
          src = 'Tick.jpg'
        }
        else if (tran.type === 2) {
          tranMsg = 'Request received'
          button = `<button> Pay </button> <button> Decline </button> `
          src = 'Wait.jpg'
        }
      }


      parent.innerHTML += `
            <div style="display: flex; justify-content: center;align-items: center;margin-top:5px">${date}</div>
            <div class="tranBox">
                <div style="float:${direction}"> 
                <div style="border: 2px solid black;"> 
                  <h2 style="display: contents" ><img src="Rupee.jpg" height="5" width="2">${tran.amount}</h2> 
                  <span style="float:right"><img src=${src} width="5" height="5"> ${tranMsg}</span>
                  <br>${tranid}
                  <div class="buttons" > ${button} </div>
                  </div>
                  <div style="float:right; padding:0"> ${new Date(tran.startDate).toLocaleString()} </div>
                  </div>
            </div`

    })
  })