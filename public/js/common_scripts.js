$(document).ready(function () {
    $('#table').basictable({
        breakpoint: 1024
    });

    function prepCSVRow(arr, columnCount, initial) {
        var row = ''; // this will hold data
        var delimeter = ','; // data slice separator, in excel it's `;`, in usual CSv it's `,`
        var newLine = '\r\n'; // newline separator for CSV row

        /*
         * Convert [1,2,3,4] into [[1,2], [3,4]] while count is 2
         * @param _arr {Array} - the actual array to split
         * @param _count {Number} - the amount to split
         * return {Array} - splitted array
         */
        function splitArray(_arr, _count) {
            var splitted = [];
            var result = [];
            _arr.forEach(function(item, idx) {
                if ((idx + 1) % _count === 0) {
                    splitted.push(item);
                    result.push(splitted);
                    splitted = [];
                } else {
                    splitted.push(item);
                }
            });
            return result;
        }
        var plainArr = splitArray(arr, columnCount);
        // don't know how to explain this
        // you just have to like follow the code
        // and you understand, it's pretty simple
        // it converts `['a', 'b', 'c']` to `a,b,c` string
        plainArr.forEach(function(arrItem) {
            arrItem.forEach(function(item, idx) {
                row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
            });
            row += newLine;
        });
        return initial + row;
    }


    // This must be a hyperlink
    $("#csv_download").on('click', function(event) {
        event.preventDefault();
        var titles = [];
        var data = [];

        /*
         * Get the table headers, this will be CSV headers
         * The count of headers will be CSV string separator
         */
        $('#table th').each(function() {
            titles.push($(this).text());
        });

        /*
         * Get the actual data, this will contain all the data, in 1 array
         */
        $('#table td').each(function() {
            data.push($(this).text());
        });

        /*
         * Convert our data to CSV string
         */
        var CSVString = prepCSVRow(titles, titles.length, '');
        CSVString = prepCSVRow(data, titles.length, CSVString);

        /*
         * Make CSV downloadable
         */
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", CSVString]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = Date.now()+".csv";

        /*
         * Actually download CSV
         */
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink)
    });


    $("#excel_download").on('click', function(event) {
        event.preventDefault();
        var titles = [];
        var data = [];

        /*
         * Get the table headers, this will be CSV headers
         * The count of headers will be CSV string separator
         */
        $('#table th').each(function() {
            titles.push($(this).text());
        });

        /*
         * Get the actual data, this will contain all the data, in 1 array
         */
        $('#table td').each(function() {
            data.push($(this).text());
        });

        /*
         * Convert our data to CSV string
         */
        var CSVString = prepCSVRow(titles, titles.length, '');
        CSVString = prepCSVRow(data, titles.length, CSVString);

        /*
         * Make CSV downloadable
         */
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", CSVString]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = Date.now()+".xlsx";

        /*
         * Actually download CSV
         */
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink)
    });

});






$(document).on('click','#pdf_download',function (e) {
    e.preventDefault();
    window.print();
//     var columns = [];
//     var rows = [];
//     var rows_td_data=[];
//
//     $("thead th").each(function (i) {
//         columns.push($(this).text());
//     });
//
//     $("tbody tr").each(function (i) {
//        $(this).find("td").each(function (j) {
//            rows_td_data.push($(this).text());
//        });
//         rows.push(rows_td_data);
//         rows_td_data=[];
//     });
//
//
// // Only pt supported (not mm or in)
//     var doc = new jsPDF('p', 'pt');
//     doc.autoTable(columns, rows,{
//         startY: 15,
//         margin: { horizontal: 0 },
//         bodyStyles: { valign: 'top' },
//         styles: { overflow: 'linebreak', columnWidth: 'wrap' },
//         columnStyles: { 2: {
//             columnWidth: 'auto'
//         } }
//     });
//     doc.save(Date.now()+'.pdf');
});