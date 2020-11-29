class DatePicker{
	constructor(id, callback){
		this.id=id;
		this.callback=callback;
	}
	render(Datte){
		let cont = document.getElementById(this.id);
		let table=document.createElement("table"); //husnegt
		let headRow=table.insertRow(0); // 
		let back=headRow.insertCell(0);//
		let monthName=headRow.insertCell(1);
		monthName.id="month";
		let next=headRow.insertCell(2);
		back.innerHTML="<";
		next.innerHTML=">";
		back.style.cursor="pointer";
		next.style.cursor="pointer";
		let months= ["January", "February","March", "April","May", "June", "July", "August", "September","October","November","December"];
		monthName.innerHTML=months[Datte.getMonth()]+" "+Datte.getFullYear();//js in uurinh n 0-11
		monthName.colSpan="5";
		cont.appendChild(table);
		let dayRow=table.insertRow(1);
		dayRow.insertCell(0).innerHTML="Su";
		dayRow.insertCell(1).innerHTML="Mo";
		dayRow.insertCell(2).innerHTML="Tu";
		dayRow.insertCell(3).innerHTML="We";
		dayRow.insertCell(4).innerHTML="Th";
		dayRow.insertCell(5).innerHTML="Fr";
		dayRow.insertCell(6).innerHTML="Sa";
		back.addEventListener('click',()=>{
			table.remove();
			Datte.setMonth(Datte.getMonth()-1);
			this.render(Datte);
		});
		next.addEventListener('click',()=>{
			table.remove();
			Datte.setMonth(Datte.getMonth()+1); // 
			this.render(Datte);
		});
		function getDaysInMonth(month, year) {
    		return new Date(year, month, 0).getDate();
		} 
		let i=new Date(Datte.getFullYear()+"/"+(Datte.getMonth()+1)+"/01").getDay(); //29/12/2019 =>>> 01/12/2019.getday 
		let daysInMonth=getDaysInMonth((Datte.getMonth()+1),Datte.getFullYear()); //sard hden honog
		let daysInMonthPre=getDaysInMonth((Datte.getMonth()),Datte.getFullYear()); //umnuh sarin honogin too 
		// console.log(daysInMonth);
		// console.log(i);
		let j,s,c=1,n=1;
		let ob={month: " ", day: " ", year:" "};
		for(s=2; s<7; s++){
			let roww=table.insertRow(s);
			for(j=0,daysInMonthPre=daysInMonthPre-i+1; j<i; j++,daysInMonthPre++){
				let cell = roww.insertCell(j);
				cell.innerHTML=daysInMonthPre;
				cell.style.color="red";
				cell.addEventListener('click', ()=>{
					ob={month:(Datte.getMonth()), day: cell.innerHTML, year: Datte.getFullYear()};
					console.log(ob);
					this.callback(this.id,ob);

				});
			}
			for(i; i<7; i++){
				if(c>daysInMonth){
					let cell = roww.insertCell(i);
					cell.innerHTML=n;
					cell.style.color="red";
					cell.addEventListener('click', ()=>{
						ob={month:(Datte.getMonth()+2), day: cell.innerHTML, year: Datte.getFullYear()};
						console.log(ob);
						this.callback(this.id,ob);
					});
					n++;

				}else{
					let cell = roww.insertCell(i);
					cell.innerHTML=c;
					cell.addEventListener('click', ()=>{
						ob={month:(Datte.getMonth()+1), day:cell.innerHTML, year: Datte.getFullYear()};
						console.log(ob);
						this.callback(this.id,ob);
					});
					c++;
				}
				
			}
			i=0;
		}	
		return ob;	
	}
}


//dom=> createElement, insertRow, insertCell