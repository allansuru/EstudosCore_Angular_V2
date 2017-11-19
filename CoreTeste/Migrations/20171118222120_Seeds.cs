using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CoreTeste.Migrations
{
    public partial class Seeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Make3')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelA', (SELECT Id from Makes WHERE Name = 'Make1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelB', (SELECT Id from Makes WHERE Name = 'Make1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelC', (SELECT Id from Makes WHERE Name = 'Make1'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelA', (SELECT Id from Makes WHERE Name = 'Make2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelB', (SELECT Id from Makes WHERE Name = 'Make2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelC', (SELECT Id from Makes WHERE Name = 'Make2'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelA', (SELECT Id from Makes WHERE Name = 'Make3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelB', (SELECT Id from Makes WHERE Name = 'Make3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelC', (SELECT Id from Makes WHERE Name = 'Make3'))");

            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Feature1')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Feature2')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Feature3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN('Make1','Make2','Make3')");
            migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('Feature1', 'Feature2', 'Feature3')");
        }
    }
}
