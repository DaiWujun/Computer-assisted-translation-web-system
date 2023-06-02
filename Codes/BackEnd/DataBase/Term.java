import javax.persistence.*;

@Entity
@Table(name = "terms")
public class Term
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "term")
    private String term;

    @Column(name = "definition")
    private String definition;

    @Column(name = "context")
    private String context;

    @Column(name = "source")
    private String source;

    @Column(name = "category")
    private String category;

    // Constructors

    // Getter and Setter methods for id
    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    // Getter and Setter methods for term
    public String getTerm()
    {
        return term;
    }

    public void setTerm(String term)
    {
        this.term = term;
    }

    // Getter and Setter methods for definition
    public String getDefinition()
    {
        return definition;
    }

    public void setDefinition(String definition)
    {
        this.definition = definition;
    }

    // Getter and Setter methods for context
    public String getContext()
    {
        return context;
    }

    public void setContext(String context)
    {
        this.context = context;
    }

    // Getter and Setter methods for source
    public String getSource()
    {
        return source;
    }

    public void setSource(String source)
    {
        this.source = source;
    }

    // Getter and Setter methods for category
    public String getCategory()
    {
        return category;
    }

    public void setCategory(String category)
    {
        this.category = category;
    }
}
