define(
    'Status/Factory',
    ["Status/StatusCollection"],
    function (StatusCollection) {
        'use strict';

        return function () {
            var statuses;

            var getStatuses = function() {
                if (typeof statuses == 'undefined') {
                    statuses = new StatusCollection([
                        {id: 1, name: "To do"},
                        {id: 2, name: "In progress"},
                        {id: 3, name: "Ready fo test"},
                        {id: 31, name: "In Test"},
                        {id: 32, name: "Ready for prod"},
                        {id: 33, name: "In prod"},
                        {id: 5, name: "Done"},
                    ]);
                }


                return statuses;
            };

            /*
             <option selected="selected" value="1">Новая</option>
             <option value="2">В работе</option>
             <option value="4">Обратная связь</option>
             <option value="3">Решена</option>
             <option value="5">Закрыта</option>
             <option value="6">Отклонена</option>
             */
            this.create = function(externalStatus, taskName) {
                var status = getStatuses().get(1)

                if (externalStatus == 2) {
                    status = getStatuses().get(2);
                }
                if (externalStatus == 3) {
                    status = getStatuses().get(3);
                }
                if (externalStatus == 5) {
                    status = getStatuses().get(5);
                }
                if (taskName.indexOf('[In Test]') >= 0) {
                    status = getStatuses().get(31);
                }
                if (taskName.indexOf('[Ready for prod]') >= 0) {
                    status = getStatuses().get(32);
                }
                if (taskName.indexOf('[In prod]') >= 0) {
                    status = getStatuses().get(33);
                }

                return status;
            };

        };
    }
);