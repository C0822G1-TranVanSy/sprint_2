
package com.sport_store.reposiotry;

import com.sport_store.entity.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface IAccountRepository extends JpaRepository<Account,Long> {

    Boolean existsAccountByUsername(String username);

    Boolean existsAccountByEmail(String email);


    @Query(value = "select * from account where username = :username", nativeQuery = true)
    Optional<Account> findByUsername(@Param("username") String username);

    /**
     * Create by : NuongHT
     * Date create: 27/02/2023
     * Description: create query get account by accountID and save newPass allow accountID
     *
     * @param 'accountId'
     * @return account
     */
    @Query(value = "select * from account where account_id = :accountId", nativeQuery = true)
    Optional<Account> findByUserId(@Param("accountId") Long accountId);


    @Modifying
    @Query(value = "update account set password = :newPass where account_id= :accountId",nativeQuery = true)
    void save(@Param("accountId") Long accountId);

    @Modifying
    @Query(value = "update account set avatar = :ava where account_id = :accountId",nativeQuery = true)
    void changeAvatar(@Param("accountId") Long accountId,@Param("ava") String ava);

    @Modifying
    @Query(value = "update account set name = :name, phone_number= :phoneNumber, address = :address, email = :email where account_id = :accountId",nativeQuery = true)
    void changeInfo(@Param("accountId") Long accountId,@Param("name") String name,
                    @Param("phoneNumber") String phoneNumber,@Param("address") String address,@Param("email") String email);
}
