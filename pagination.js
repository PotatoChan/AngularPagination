function getPagination($scope, clickNum, total, limit) {

    var pageNum = parseInt(total / limit) + ((total % limit) > 0 ? 1 : 0); //计算页数

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

    //计算页面数量
    for (var i = 1; i <= pageNum && i < 6; i++) {

        var item = {};

        item.num = i;

        if (i == clickNum) {
            item.style = "active";
        }

        $scope.pagination.page.push(item);
    }

    return $scope.pagination;
}