import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Filter, Star, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Imports das imagens
import camisetaAvanti from "@/assets/camiseta-avanti.jpg";
import foneWireless from "@/assets/fone-wireless.jpg";
import cafeteira from "@/assets/cafeteira.jpg";
import hoodieAvanti from "@/assets/hoodie-avanti.jpg";
import smartWatch from "@/assets/smart-watch.jpg";
import airFryer from "@/assets/air-fryer.jpg";

// Mock data para os produtos
const products = [
  {
    id: 1,
    name: "Camiseta AVANTI Premium",
    category: "roupas",
    price: 850,
    originalPrice: 1200,
    image: camisetaAvanti,
    featured: true,
    discount: 30,
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Fone de Ouvido Wireless",
    category: "eletronicos", 
    price: 2400,
    originalPrice: 3000,
    image: foneWireless,
    featured: true,
    discount: 20,
    rating: 4.9,
    inStock: true
  },
  {
    id: 3,
    name: "Cafeteira Elétrica",
    category: "eletrodomesticos",
    price: 4500,
    originalPrice: null,
    image: cafeteira,
    featured: false,
    discount: 0,
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "Hoodie AVANTI",
    category: "roupas",
    price: 1200,
    originalPrice: 1600,
    image: hoodieAvanti,
    featured: false,
    discount: 25,
    rating: 4.7,
    inStock: false
  },
  {
    id: 5,
    name: "Smart Watch",
    category: "eletronicos",
    price: 3200,
    originalPrice: 4000,
    image: smartWatch,
    featured: true,
    discount: 20,
    rating: 4.5,
    inStock: true
  },
  {
    id: 6,
    name: "Air Fryer Compacta",
    category: "eletrodomesticos",
    price: 2800,
    originalPrice: null,
    image: airFryer,
    featured: false,
    discount: 0,
    rating: 4.4,
    inStock: true
  }
];

const ExcellentPoints = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Dados do usuário (mock)
  const userPoints = 8500;

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const featuredProducts = filteredProducts.filter(p => p.featured);
  const regularProducts = filteredProducts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6">{/* Sem sidebar */}
          {/* Header da página */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft size={16} />
                Início
              </Button>
              
              <div className="bg-gradient-primary px-6 py-3 rounded-xl shadow-purple">
                <div className="text-white text-center">
                  <p className="text-sm opacity-90">Seus EP's</p>
                  <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Loja de <span className="text-primary">Excellent Points</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Troque seus EP's por produtos incríveis
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter size={16} />
                  Filtros
                </Button>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas Categorias</SelectItem>
                    <SelectItem value="roupas">Roupas</SelectItem>
                    <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                    <SelectItem value="eletrodomesticos">Eletrodomésticos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            {showFilters && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Faixa de Preço (EP's): {priceRange[0]} - {priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Produtos em Destaque */}
          {featuredProducts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="text-primary" size={24} />
                <h2 className="text-2xl font-bold text-foreground">Produtos em Destaque</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    {product.discount > 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-destructive text-destructive-foreground">
                          -{product.discount}%
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 z-10">
                      <Button size="icon" variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Heart size={16} />
                      </Button>
                    </div>
                    
                    <div className="aspect-square bg-gradient-secondary overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(product.rating) ? "text-warning fill-warning" : "text-muted-foreground"} 
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          {product.price} EP's
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice} EP's
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full gap-2" 
                        disabled={!product.inStock || product.price > userPoints}
                      >
                        <ShoppingCart size={16} />
                        {!product.inStock ? "Esgotado" : product.price > userPoints ? "EP's Insuficientes" : "Resgatar"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Todos os Produtos */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Todos os Produtos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularProducts.map((product) => (
                <Card key={product.id} className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-destructive text-destructive-foreground">
                        -{product.discount}%
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 z-10">
                    <Button size="icon" variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Heart size={16} />
                    </Button>
                  </div>
                  
                  <div className="aspect-square bg-gradient-secondary overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < Math.floor(product.rating) ? "text-warning fill-warning" : "text-muted-foreground"} 
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                    </div>
                    
                    <h3 className="font-medium text-foreground mb-2 text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-lg font-bold text-primary">
                        {product.price}
                      </span>
                      <span className="text-xs text-muted-foreground">EP's</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm"
                      className="w-full gap-1" 
                      disabled={!product.inStock || product.price > userPoints}
                    >
                      <ShoppingCart size={14} />
                      {!product.inStock ? "Esgotado" : product.price > userPoints ? "Insuficiente" : "Resgatar"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </main>
      
      <AIChat />
    </div>
  );
};

export default ExcellentPoints;