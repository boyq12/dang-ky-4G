
$( document ).ready(function() {
    GetAllDataPackages()
});

function GetAllDataPackages(){
    $.ajax({
        url: "https://4gquocdan.somee.com/Home/GetAllDataPackages",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/json');},
        success: function(data) { 
            var allPackages = "";
            data.forEach(group => {
                allPackages += GenerateGroupDataPackage(group);
            });

            $("#datapackages").html(allPackages);
         }
     });
}

function GenerateGroupDataPackage(group) {
    var dataType = "";
    if(group.dataType === 1){
        dataType = "Gói Data cho Di Động";
    } else if(group.dataType === 2){
		dataType = "Gói Data cho Dcom";
	} else if(group.dataType === 3){
		dataType = "Gói Combo cho Di Động";
	} else {
		dataType = "Gói di động trả trước";
	}

    var nhaMang = "";
    if(group.items[0].networkProvider === 1){
        nhaMang = "Viettel";
    }

    var dataPackageHtml = "";
    group.items.forEach(dataPackage => {
        var newPackage = `<div class='widget HTML' data-version='1' id="HTML_44">
                <h2 class='title'>${dataPackage.name}</h2>
                <div class='widget-content'>
                    <div class="datap">
                            <div class="new"><img src="/Content/images/new.png" alt="" /></div>
                        <ul>
                            <li class="name"><a href="/p/st90-viettel">${dataPackage.name}</a></li>
                            <li class="number"> <span class="big">${dataPackage.description}</span><span></span></li>
                            <li class="price">${dataPackage.price}</li>
                        </ul>
                        <a href="/p/st90-viettel" class="chitiet details">Chi Tiết <i class="fa fa-share"></i></a>
                        <a onclick="smsbutton('9123','ST90 962559589')" class="dangky data-sms signup">Đăng Ký Qua SMS <i class="fa fa-location-arrow"></i></a>
                    </div>
                </div>

                <div class='clear'></div>
            </div>`
        
        dataPackageHtml += newPackage;
    });


    return `<div id='sim-di-dong'>
                <div class='title-viettel'>G&#243;i ${dataType} ${nhaMang}</div>
                <div class='sim-di-dong container section' id='Sim di động'>
                    ${dataPackageHtml}
                </div>
            </div>`;
}
