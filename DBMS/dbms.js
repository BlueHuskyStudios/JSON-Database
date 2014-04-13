var json_DBMS = {
	/**
	 * Checks to be sure that the database model is valid. This considers the following:
	 * 
	 * 	- The database must contain 1 object of type 'string' named 'name', containing at least 1 character.
	 * 	- If the database has tables, they must be contained in 1 Array named 'tables'.
	 * 		- If the 'tables' array is not empty, it must contain objects with the following variables:
	 * 			- Each table must contain 1 object of type 'string' named 'name', containing at least 1 character.
	 * 			- If a table has columns, they must be contained in 1 Array named 'columns'
	 * 				- Each column must contain 1 object of type 'string' named 'name', containing at least 1 character.
	 * 				- Each column must contain 1 object of type 'string' named 'type', containing the name of a valid
	 * 				  JavaScript object, excluding 'null' and 'undefined'
	 * 				- If whether the column's value should automatically be set must be specified, it must contain an object of
	 * 				  type 'boolean' named 'auto_increment' with a value of true or false
	 * 				- If whether the column is the primary key for the table must be specified, it must contain an object of
	 * 				  type 'boolean' named 'primary_key' with a value of true or false
	 * 				- If whether the column is the foreign key for the table must be specified, it must contain an object of
	 * 				  type 'boolean' named 'foreign_key' with a value of true or false
	 * 				- If whether the column's value is required to be set must be specified, it must contain an object of type
	 * 				  'boolean' named 'required' with a value of true or false
	 * 
	 * @param db the database, as a JavaScript object
	 * @return the database as given, iff it is valid
	 * 
	 * @author Kyli Rouge
	 * @since 2014-04-13
	 * @version 1.0.0
	 */
	validateDatabase: function(db) {
		if (!db.name || typeof db.name !== "string")
			throw "database 'name' must be set to a non-empty string";

		if (db.tables)
		{
			if (!(db.tables instanceof Array))
				throw "if set, the '" + db.name + "' database's 'tables' must be an array";
			
			if (db.tables.length)
			{
				for(table in db.tables)
				{
					table = db.tables[table]; // this should work... I hope.
					if (!table.name || typeof table.name !== 'string')
						throw "All tables in '" + db.name + "' must have 1 'name' that is a non-empty string";
					
					if (table.columns)
					{
						if (!(table.columns instanceof Array))
							throw "if set, the '" + table.name + "' table's 'columns' must be an array";
						
						if (table.columns.length)
						{
							for(col in table.columns)
							{
								col = table.columns[col];
								// Name: 
								if (!col.name || typeof col.name !== 'string')
									throw "All columns in '" + table.name + "' must have 1 'name' that is a non-empty string";
								
								// Type:
								if (!col.type || typeof col.type !== 'string')
									throw "All columns in '" + table.name + "' must have 1 'type' that is a non-empty string";
								
								type = col.type.toLowerCase();
								
								if (!(
										type === 'string' ||
										type === 'number' ||
										type === 'boolean' ||
										type === 'object' ||
										type === 'array' ||
										type === 'regexp'
									))
									throw "All columns in '" + table.name + "' must have 1 'type' whose value is a JavaScript"
										+ " type, excluding 'null' and 'undefined'";
								
								// Flags:
								if (col.auto_increment && !(typeof col.auto_increment === 'boolean'))
									throw "To mark a column as auto-incrementing, it must contain a boolean named"
										+ "'auto_increment'";
								if (col.primary_key && !(typeof col.auto_increment === 'boolean'))
									throw "To mark a column as the primary key, it must contain a boolean named 'primary_key'";
								if (col.foreign_key && !(typeof col.foreign_key === 'boolean'))
									throw "To mark a column as a foreign key, it must contain a boolean named 'foreign_key'";
								if (col.required && !(typeof col.required === 'boolean'))
									throw "To mark a column as required, it must contain a boolean named 'required'";
							}
						}
					}
				}
			}
		}
		
		return db;
	}
};