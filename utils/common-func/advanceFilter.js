import _ from 'lodash'
import moment from 'moment';
import Vue from 'vue';
const initFilter = (choosenFilter = null, searchRequest, request = null) => {
  var should = [];
  if (searchRequest.description) {
    should.push(
      {
        "match_phrase": {
          "name": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "fullName": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "phoneNumber": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "email": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "dataValue": searchRequest.description
        }
      },
    );
  }
  var query = {
    "from": (searchRequest.currentPage - 1) >= 0 ? (searchRequest.currentPage - 1) * searchRequest.pageSize : 0,
    "size": searchRequest.pageSize,
    "sort": searchRequest.sort.field + ":" + searchRequest.sort.sortOrder,
    "query": {
      "bool": {
        "must": [],
        "must_not": [
          {
            "ids": {
              "values": request ? request.ids : []
            }
          }
        ],
        "should": should,
        "minimum_should_match": searchRequest.description ? 1 : 0
      }
    }
  }
  if (request && request.userIds) {
    query.query.bool.must.push(
      {
        "ids": {
          "values": request ? request.userIds : []
        }
      }
    )
  }
  if (request && request.userId) {
    query.query.bool.must.push(
      {
        "terms": {
          "userId": request ? request.userId : []
        }
      }
    )
  }
  _.forEach(choosenFilter, function (filter) {
    switch (filter.searchType) {
      case "text":
        var queryMatchPhare = {};
        queryMatchPhare[filter.field] = filter.filterText;
        query.query.bool.must.push({
          "match_phrase": queryMatchPhare
        })
        break;
      case "date":
        query.query.bool.must.push({
          "range": {
            [filter.field]: {
              "gte": filter.date[0]/1,
              "lte": filter.date[1]/1
            }
          }
        });
        break;
      case "checkbox":
        var data = _.map(filter.data, (o) => { return o.id });
        query.query.bool.must.push({
          "terms": {
            [filter.field]: data
          }
        })
        break;
      case "select":
        query.query.bool.must.push({
          "range": {
            "updateAt": {
              "lte": "now-" + filter.select + "d/d"
            }
          }
        });
        break;
      default:
    }
  });
  return query;
}
export default {
  initFilter
};
