import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './font';
import _ from 'lodash';

// Вывод алфавита
export const alphabet = (charA: any, charZ: any) => {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) a.push(String.fromCharCode(i));
    return a;
};

// Настройка вида таблицы
const configTable = (startY: any) => {
    return {
        useCss: true,
        theme: 'grid',
        startY: startY,
        pageBreak: 'auto',
        margin: {horizontal: 10, top: 10, bottom: 10},
        headStyles: {fillColor: [0, 188, 212], textColor: [255, 255, 255]},
        styles: {
            font: 'museo',
            fontStyle: "normal",
            cellPadding: 1.4, // a number, array or object (see margin below)
            overflow: 'linebreak',
            valign: 'middle',
            halign: 'center'
        },
    }
};

// Добавление данных на лист
const decorList = ({doc, setting, options}: any) => {
    // Натройка ширифта
    doc.setFont('museo');
    doc.setTextColor(150);
    doc.setFontSize(12);

    // Вывод текста
    doc.text(10, options.height - 5, 'Сайт: cabinet.eon.uz        Телефон: +99890 911 24 21 / +99891 163 85 55         E-Mail: info@eon.uz');
    doc.text(10, 7.5, `Упражнение: ${options.name}    ID: ${setting.resultId}`);

    return doc;
};

// Вывод размеров
const sheetMeshSetting = ({doc, tables}: any) => {
    // Параметры листа
    let heightList = doc.internal.pageSize.height,
        // widthList = doc.internal.pageSize.width,
        // Высота колонки
        rowHeight = 8,
        // Количество таблиц на одной станице
        numberOfTablesOnOneList = Math.floor((heightList - 10) / (tables[0].length * rowHeight + (10 + rowHeight))),
        // Кол-во страниц
        pages = Math.ceil(tables.length / numberOfTablesOnOneList),
        // Кол-во на последней странице
        lastPage = tables.length - ((pages - 1) * numberOfTablesOnOneList);
    return [pages, numberOfTablesOnOneList, lastPage, rowHeight, heightList];
};

export const pdfRender = async (setting: any, data: any, language: any) => {
    setting.resultId = data.id;
    let doc = new jsPDF("p", "mm", "a4");
    let isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    if (!isMultiplication) {
        let title = `${language.modeNames[setting.mode]}, ${language.typeNames[0][setting.type]}, ${setting.length}-значные, ${setting.theme !== 'o' ? 'Тема:  ' + setting.theme : ''}`;
        // Вывод заданий
        let count_page = renderTableOne({
            doc,
            rows: data.data.map((task: any) => task.exercise),
            settings: setting,
            startPage: null,
            title,
            users: data.data.map((task: any) => ({user: task.user, result: task.result}))
        });
        // Вывод ответов doc, rows, settings, userData, startPage, title
        renderTableOne({
            doc,
            rows: data.data.map((task: any) => task.answer),
            settings: setting,
            startPage: count_page,
            title,
        });
    } else {
        let title = `${language.lengthNames[setting.length]} ${language.modeNames[setting.mode]} ${setting.type === 'o' ? setting.theme : language.typeNames[1][setting.type]}`;
        // doc, rows, settings, userData, startPage, title
        let count_page = renderTableTwo({
            doc,
            rows: data.data.map((task: any) => task.exercise),
            settings: setting,
            startPage: null,
            title,
            users: data.data.map((task: any) => ({user: task.user, result: task.result}))
        });
        renderTableTwo({
            doc,
            rows: data.data.map((task: any) => task.answer),
            settings: setting,
            startPage: count_page,
            title
        });
    }

    doc.save(`Листы тренировка ID ${data.id}.pdf`);
};


//
const updateTheRowsInTheTables = ({_rows, settings, columns, answ, users}: any) => {
    let alpha = alphabet('A', 'Z'),
        tableForPdf: any = [],
        tables = _.chunk(_rows, settings.column),
        userTables:any = _.chunk(users, settings.column);
    if (!answ)
        tables.map((table: any, k: number) =>
            table.map((rows: any, ke: number) => {
                columns[k] = columns[k] || [];
                columns[k].push({title: alpha[ke], dataKey: ke});

                if(users.length)
                    rows.push(userTables[k][ke].user);
                else
                    rows.push('');
                return rows.map((column: any, key: string | number) => {
                    tableForPdf[k] = tableForPdf[k] || [];
                    tableForPdf[k][key] = tableForPdf[k][key] || [];
                    tableForPdf[k][key][ke] = column;
                    return column;
                });
            })
        );
    else
        tables.map((table, k) => {
            table.map((rows, ke) => {
                columns[k] = columns[k] || [];
                columns[k].push({title: alpha[ke], dataKey: ke});
                return rows;
            });

            tableForPdf[k] = tableForPdf[k] || [];
            tableForPdf[k] = [table];
            return table;
        });

    return [columns, tableForPdf];
};

const updateTheRowsInTheTablesTwo = ({_rows, settings, columns, answ, users}: any) => {
    let alpha = alphabet('A', 'Z'),
        tableForPdf: any = [],
        tables = _.chunk(_.chunk(_rows, settings.column), settings.rows),
        userTables: any = _.chunk(_.chunk(users, settings.column), settings.rows);

    tables.map((table: any, k: number) => {
        tableForPdf[k] = [];
        return table.map((rows: any, ke: number) => {
            let answerEmpty: any = [],
                columnEmpty = [];

            columnEmpty.push({title: '#', dataKey: 0});
            if(users)
                answerEmpty.push('');
            rows.map((column: any, key: number) => {
                columnEmpty.push({title: alpha[key], dataKey: key + 1});
                if(users)
                    answerEmpty.push(`${userTables[k][ke][key].user}`);
                else
                    answerEmpty.push('');
                return column;
            });


            columns[k] = columnEmpty;
            table[ke].unshift(ke + 1);
            tableForPdf[k].push(table[ke]);
            if (!answ)
                tableForPdf[k].push(answerEmpty);

            return rows;
        });
    });
    return [columns, tableForPdf];
};

export const renderTableOne = ({doc, rows, settings,
                                   // userData,
                                   startPage, title, users}: any) => {
    /**
     * column       =   {title: "A", dataKey: 0} Вывод тайтла и ключа
     * tableForPdf  =   [Таблица [Строка [Колона ]]]
     */
    let [columns, tableForPdf] = updateTheRowsInTheTables({
        _rows: rows,
        settings,
        columns: [],
        answ: startPage,
        users
    });

    /** Вывод размеров
     * pages                    =   Кол-во страниц
     * numberOfTablesOnOneList  =   Макс. кол-во таблиц поместиться
     * lastPage                 =   Кол-во на таблице на последней странице
     * rowHeight                =   8
     * heightList               =   Высота страницы
     */
    let currentPage = 1, [pages, numberOfTablesOnOneList, lastPage, rowHeight, heightList] = sheetMeshSetting({
        doc,
        tables: tableForPdf
    });

    if (startPage) {
        pages += startPage;
        currentPage += startPage;
    }

    // Ключ колонки
    let keyRow = 0;

    for (; currentPage <= pages; currentPage++) {
        // Добавление страниц
        currentPage === 1 || doc.addPage();
        // Выбор страницы
        doc.setPage(currentPage);

        // Кол-во таблиц на текущей странице
        let count = currentPage === pages && currentPage !== 1 ? lastPage : numberOfTablesOnOneList;

        for (let a = 0; a <= count; a++) {
            if (typeof tableForPdf[keyRow] !== 'undefined') {
                // Позиция строки
                let startY = a === 0 ? (a * (((tableForPdf[keyRow].length + 1) * rowHeight) + 5)) + 10 : (a * (((tableForPdf[keyRow].length + 1) * rowHeight))) + 10;

                // Настройка цвета
                doc.setTextColor(150);
                // Настройка Размера
                doc.setFontSize(12);
                // Вывод текста (startY позиция)
                doc.text(5, startY + 5, `${keyRow + 1}`);

                // Добавление таблицы
                doc.autoTable(columns[a], tableForPdf[keyRow], configTable(startY));
            }
            keyRow++;
        }
        doc = decorList({
            doc,
            setting: settings,
            options: {name: `Листы ${title}`, height: heightList}
        });
    }

    return pages;
};

export const renderTableTwo = ({doc, rows, settings,
                                   // userData,
                                   startPage, title, users}: any) => {
    // _rows, settings, columns, answ
    let [columns, tableForPdf] = updateTheRowsInTheTablesTwo({_rows: rows, settings, columns: [], answ: startPage, users});
    let [pages, numberOfTablesOnOneList, lastPage, rowHeight, heightList] = sheetMeshSetting({
        doc,
        tables: tableForPdf
    });

    let contList = 1;
    let i = 1;

    if (startPage) {
        pages += startPage;
        i += startPage;
    }

    for (; i <= pages; i++) {
        i === 1 || doc.addPage();
        doc.setPage(i);

        // Кол-во таблиц на текущей странице
        let count = i === pages && i !== 1 ? lastPage : numberOfTablesOnOneList;
        let currentTart = startPage ? ((i - 1) - startPage) * count : (i - 1) * numberOfTablesOnOneList;

        for (let a = 0; a < count; a++) {
            if (typeof tableForPdf[a] !== 'undefined') {
                let startY = a === 0 ? (a * (((tableForPdf[a].length + 1) * rowHeight) + 5)) + 10 : (a * (((tableForPdf[a].length + 1) * rowHeight))) + 10;

                doc.setTextColor(150);
                doc.setFontSize(12);
                doc.text(5, startY + 5, `${contList}`);

                // Добавление таблицы
                doc.autoTable(columns[currentTart], tableForPdf[currentTart],
                    {
                        ...configTable(startY), columnStyles: {
                            0: {
                                fillColor: [0, 188, 212],
                                textColor: [255, 255, 255],
                                cellWidth: 10,
                                lineWidth: 0,
                            }
                        }
                    });
            }
            currentTart++;
            contList++;
        }

        // doc, setting, options
        doc = decorList({
            doc,
            setting: settings,
            options: {name: `Листы ${title}`, height: heightList}
        });
    }
    return pages;
};
