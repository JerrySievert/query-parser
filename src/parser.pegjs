Expression
  = valueLeft:String _ operator:Operator _ valueRight:Value { return { "left": valueLeft, "right": valueRight, "operator": operator }; }
  / '(' _ exprLeft:Expression _ token:Token _ exprRight:Expression _ ')' { return { "left": exprLeft, "right": exprRight, "operator": token }; }

Token
  = 'AND'
  / 'OR'

Operator
  = '>='
  / '<='
  / '<'
  / '>'
  / '=='
  / '!='

Value
  = Number
  / String

Number
  = Float
  / Integer

Integer "integer"
  = _ [-0-9]+ { return parseInt(text(), 10); }

Float "float"
  = digits:$([-0-9.]+ !String) { return parseFloat(digits, 10); }

String
  = QuotedString
  / UnquotedString

QuotedString "quoted string"
  = _ str:('"'[a-zA-Z.\(\)\[\]\s0-9_;,$#%:']+'"') { return str[1].join(''); }
  / _ str:("'"[a-zA-Z.\(\)\[\]\s0-9_;,$#%:"]+"'") { return str[1].join(''); }

UnquotedString "unquoted string"
  = str:([a-zA-Z_][a-zA-Z0-9._]*) { return str[0] + str[1].join(''); }
  
_ "whitespace"
  = [ \t\n\r]*