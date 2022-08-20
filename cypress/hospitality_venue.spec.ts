/**
    Before each 
        empty DB table
        
    Create a venue
        1 should create a new entry w correct properties
          Get Venues to confirm new entry is added
        
        2 if not, should return an error
        

    Update a venue
        1 should update an existing entry w selected properties
          Get venue to confirm only changes made

        2 if not, should return an error

        3 if updating approvalStatus, must have relevant permissions
          Get venue to confirm changes reflect permissions
        a. has permissions, changes success
        b. hasn't permission, no changes & show error


    Delete a venue
        Seed DB
        1 delete value
        Get Venues to confirm new entry has been deleted

 */

export {};
