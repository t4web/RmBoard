define(
    'Status/Factory',
    ["Status/StatusCollection"],
    function (StatusCollection) {
        'use strict';

        return function (statuses) {

            if (!(statuses instanceof StatusCollection)) {
                throw new Error("Statuses must be instance of StatusCollection.");
            }

            /*
             <option selected="selected" value="1">Новая</option>
             <option value="2">В работе</option>
             <option value="4">Обратная связь</option>
             <option value="3">Решена</option>
             <option value="5">Закрыта</option>
             <option value="6">Отклонена</option>
             */
            this.create = function(externalStatus, taskName) {
                var status = statuses.get(1);

                if (externalStatus == 2 || externalStatus == 4) {
                    status = statuses.get(2);
                }
                if (externalStatus == 3) {
                    status = statuses.get(3);
                }
                if (externalStatus == 5) {
                    status = statuses.get(5);
                }
                if (taskName.indexOf('[In Test]') >= 0) {
                    status = statuses.get(31);
                }
                if (taskName.indexOf('[Ready for Prod]') >= 0) {
                    status = statuses.get(32);
                }
                if (taskName.indexOf('[In Prod]') >= 0) {
                    status = statuses.get(33);
                }

                return status;
            };

        };
    }
);