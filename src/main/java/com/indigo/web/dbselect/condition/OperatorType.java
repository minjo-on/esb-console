package com.indigo.web.dbselect.condition;

public enum OperatorType {
    EQUALS("="),
    NOT_EQUALS("!="),
    GREATER_THAN(">"),
    GREATER_OR_EQUALS(">="),
    LESS_THAN("<"),
    LESS_OR_EQUALS("<="),
    LIKE("LIKE");

    private final String symbol;

    OperatorType(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }
}
