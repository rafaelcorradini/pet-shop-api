var schemaNames = ['user'];

var schemas = {};

schemaNames.forEach(function(schemaName) {  
  schemas[schemaName] = require('./' + schemaName);
});

exports.validate = validate;

function validate(doc, schema, cb) {  
  if (typeof schema == 'string') {
    schema = schemas[schema];
  }

  if (! schema) {
    cb(new Error('Unknown schema'));
  }
  else {
    Joi.validate(doc, schema, cb);
  }
};

exports.validating = function validating(schemaName, fn) {  
  var schema = schemas[schemaName];
  if (! schema) {
    throw new Error('Unknown schema: ' + schemaName);
  }

  return function(doc, cb) {
    validate(doc, schema, function(err, doc) {
      if (err) {
        cb(err);
      }
      else {
        fn.call(null, doc, cb);
      }
    });
  };

};