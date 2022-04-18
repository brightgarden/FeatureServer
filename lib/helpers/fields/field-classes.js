const {
  isValidISODateString,
  isValidDate
} = require('iso-datestring-validator')

class Field {
  setEditable (value = false) {
    this.editable = value
    return this
  }

  setNullable (value = false) {
    this.nullable = value
    return this
  }

  setLength () {
    if (this.type === 'esriFieldTypeString') {
      this.length = 128
    } else if (this.type === 'esriFieldTypeDate') {
      this.length = 36
    }
  }
}

class ObjectIdField extends Field {
  constructor (key = 'OBJECTID') {
    super()
    this.name = key
    this.type = 'esriFieldTypeOID'
    this.alias = key
    this.sqlType = 'sqlTypeInteger'
    this.domain = null
    this.defaultValue = null
  }
}

class FieldFromKeyValue extends Field {
  constructor (key, value) {
    super()
    this.name = key
    this.type = getTypeFromValue(value)
    this.alias = key
    this.sqlType = 'sqlTypeOther'
    this.domain = null
    this.defaultValue = null
    this.setLength()
  }
}

class StatisticField extends Field {
  constructor (key) {
    super()
    this.name = key
    this.type = 'esriFieldTypeDouble'
    this.sqlType = 'sqlTypeFloat'
    this.alias = key
    this.domain = null
    this.defaultValue = null
  }
}

class StatisticDateField extends StatisticField {
  constructor (key) {
    super(key)
    this.type = 'esriFieldTypeDate'
    this.sqlType = 'sqlTypeOther'
  }
}

class FieldFromFieldDefinition extends Field {
  constructor (fieldDefinition) {
    super()
    const {
      name,
      type,
      alias,
      domain,
      sqlType,
      length,
      defaultValue,
      editable = false,
      nullable = false
    } = fieldDefinition

    this.name = name
    this.type = getTypeFromDefinition(type)
    this.alias = alias || name
    this.sqlType = sqlType || 'sqlTypeOther'
    this.domain = domain || null
    this.defaultValue = defaultValue || null
    this.length = length

    if (!this.length || !Number.isInteger(this.length)) {
      this.setLength()
    }

    const _editable = editable
    const _nullable = nullable

    this.setEditable = () => {
      this.editable = _editable
      return this
    }

    this.setNullable = () => {
      this.nullable = _nullable
      return this
    }
  }
}

class ObjectIdFieldFromDefinition extends FieldFromFieldDefinition {
  constructor (definition = {}) {
    super(definition)
    this.type = 'esriFieldTypeOID'
    this.sqlType = 'sqlTypeInteger'
  }
}

function getTypeFromValue (value) {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'esriFieldTypeInteger' : 'esriFieldTypeDouble'
  }

  if (isDate(value)) {
    return 'esriFieldTypeDate'
  }

  if (value) {
    return 'esriFieldTypeString'
  }
}

function getTypeFromDefinition (typeDefinition = '') {
  switch (typeDefinition.toLowerCase()) {
    case 'double':
    case 'esrifieldtypedouble':
      return 'esriFieldTypeDouble'
    case 'integer':
    case 'esrifieldtypeinteger':
      return 'esriFieldTypeInteger'
    case 'date':
    case 'esrifieldtypedate':
      return 'esriFieldTypeDate'
    case 'blob':
    case 'esrifieldtypeblob':
      return 'esriFieldTypeBlob'
    case 'geometry':
    case 'esrifieldtypegeometry':
      return 'esriFieldTypeGeometry'
    case 'globalid':
    case 'esrifieldtypeglobalid':
      return 'esriFieldTypeGlobalID'
    case 'guid':
    case 'esrifieldtypeguid':
      return 'esriFieldTypeGUID'
    case 'raster':
    case 'esrifieldtyperaster':
      return 'esriFieldTypeRaster'
    case 'single':
    case 'esrifieldtypesingle':
      return 'esriFieldTypeSingle'
    case 'smallinteger':
    case 'esrifieldtypesmallinteger':
      return 'esriFieldTypeSmallInteger'
    case 'xml':
    case 'esrifieldtypexml':
      return 'esriFieldTypeXML'
    case 'string':
    case 'esrifieldtypestring':
    default:
      return 'esriFieldTypeString'
  }
}

function isDate (value) {
  return value instanceof Date || ((typeof value === 'string') && (isValidDate(value) || isValidISODateString(value)))
}

module.exports = {
  ObjectIdField,
  ObjectIdFieldFromDefinition,
  FieldFromKeyValue,
  FieldFromFieldDefinition,
  StatisticField,
  StatisticDateField
}
