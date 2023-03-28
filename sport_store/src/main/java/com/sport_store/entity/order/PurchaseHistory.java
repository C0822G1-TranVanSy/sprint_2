package com.sport_store.entity.order;

import com.sport_store.entity.product.Product;

import javax.persistence.*;

@Entity
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false, referencedColumnName = "order_id")
    private Orders order;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "product_id")
    private Product product;
    private Integer quantity;
//    private String sizeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

//    public String getSizeName() {
//        return sizeName;
//    }
//
//    public void setSizeName(String sizeName) {
//        this.sizeName = sizeName;
//    }
}
