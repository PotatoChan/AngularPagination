function getPagination($scope, clickNum, total, limit) {

    //计算页数
    var pageNum = getPageNum(total, limit);

    var showPageNum = 5;

    $scope.pagination = {
        first: {
            num: 1
        },

        page: [],

        last: {
            num: pageNum
        },

        isShow: false
    };

    //页面总数大于1 才显示
    if (pageNum > 1) {
        $scope.pagination.isShow = true;
    } else {
        $scope.pagination.isShow = false;
    }
    
    var leftNum = getLeftShowNum(showPageNum, pageNum, clickNum);

    var rightNum = getRightShowNum(showPageNum, pageNum, clickNum);

    pushLeftPage($scope, clickNum, leftNum);
    pushClickPage($scope, clickNum);
    pushRightPage($scope, clickNum, rightNum);

    return $scope.pagination;
}


function pushLeftPage($scope, clickNum, num) {

    for (var i = clickNum - num; i < clickNum; i++) {
        var item = {};
        item.num = i;
        $scope.pagination.page.push(item);
    }
}

function pushRightPage($scope, clickNum, num) {

    for (var i = clickNum + 1; i <= clickNum + num; i++) {
        var item = {};
        item.num = i;
        $scope.pagination.page.push(item);
    }
}

function pushClickPage($scope, clickNum) {
    var item = {};
    item.num = clickNum;
    item.style = "active";
    $scope.pagination.page.push(item);
}


function getLeftShowNum(showPageNum, pageNum, clickNum) {

    var num = parseInt((showPageNum - 1) / 2);

    if (showPageNum % 2 == 0) {
        num--;
    }


    if (isAllOk(showPageNum, pageNum, clickNum) && isLeftOk(showPageNum, pageNum, clickNum)) {


        if (isRightOk(showPageNum, pageNum, clickNum)) {

            return (showPageNum - 1) / 2

        } else {

            return clickNum - 1 + showPageNum - pageNum;

        }

    }

    return clickNum - 1;

}

function getRightShowNum(showPageNum, pageNum, clickNum) {


    if (isAllOk(showPageNum, pageNum, clickNum) && isLeftOk(showPageNum, pageNum, clickNum) && isRightOk(showPageNum, pageNum, clickNum)) {
        return (showPageNum - 1) / 2
    }

    if (isAllOk(showPageNum, pageNum, clickNum) && !isLeftOk(showPageNum, pageNum, clickNum) && isRightOk(showPageNum, pageNum, clickNum)) {
        return showPageNum - clickNum;
    }

    return pageNum - clickNum;
}


// 总数是否满足需要展示数
function isAllOk(showPageNum, pageNum, clickNum) {

    return pageNum >= showPageNum;

}
// 左边是否满足需要展示数
function isLeftOk(showPageNum, pageNum, clickNum) {
    var num = getNum(showPageNum);
    return clickNum > num;
}
// 右边是否满足需要展示数
function isRightOk(showPageNum, pageNum, clickNum) {
    var num = getNum(showPageNum);
    return (pageNum - clickNum) >= num;
}


// 获取单侧需要展示的数量
function getNum(showPageNum) {

    var num = parseInt((showPageNum - 1) / 2);

    if (showPageNum % 2 == 0) {
        num--;
    }

    return num;
}

//计算页面总数
function getPageNum(total, limit) {

    return parseInt(total / limit) + ((total % limit) > 0 ? 1 : 0);

}