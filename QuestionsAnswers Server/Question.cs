namespace QuestionsAnswers;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; }
    public List<Tag> Tags { get; set; }
}