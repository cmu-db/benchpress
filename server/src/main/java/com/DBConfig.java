package com;

public class DBConfig {

    private String dbms;
    private String benchmark;

    public DBConfig() {
    }

    public DBConfig(String dbms, String benchmark) {
        super();
        this.dbms = dbms;
        this.benchmark = benchmark;
    }

    public String getDbms() {
        return dbms;
    }
    public void setDbms(String dbms) {
        this.dbms = dbms;
    }

    public String getBenchmark() {
        return benchmark;
    }
    public void setBenchmark(String benchmark) {
        this.benchmark = benchmark;
    }

    @Override
    public String toString() {
        return "\tDBMS: " + dbms + "\n\tBenchmark: " + benchmark + "\n\n";
    }

}
