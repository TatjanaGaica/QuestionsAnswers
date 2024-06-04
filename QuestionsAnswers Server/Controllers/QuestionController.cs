using Microsoft.AspNetCore.Mvc;
namespace QuestionsAnswers.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class QuestionController : ControllerBase
{
   public static List<Tag> Tags = new List<Tag>() {
        new Tag() {
            Id = 1,
            Text = "General"
        },
        new Tag() {
            Id = 2,
            Text = "Hobbies"
        },
        new Tag() {
            Id = 3,
            Text = "Food"
        },
        new Tag() {
            Id = 4,
            Text = "Tech"
        },
        new Tag() {
            Id = 5,
            Text = "Other"
        },
    };

    public static List<Answer> Answers = new List<Answer>() {
        new Answer() {
            Id = 1,
            Text = "Pizza",
            QuestionId = 1
        },
        new Answer() {
            Id = 2,
            Text = "Good",
            QuestionId = 2
        },
        new Answer() {
            Id = 3,
            Text = "Coin collecting",
            QuestionId = 3
        },
        new Answer() {
            Id = 4,
            Text = "Playstation 5",
            QuestionId = 4
        },
        new Answer() {
            Id = 5,
            Text = "No",
            QuestionId = 5
        },
    };
    public static List<Question> Questions = new List<Question>() {
        new Question() {
            Id = 1,
            Text = "What is your favourite food?",
            Tags = new List<Tag>() { Tags[2] }
        },
        new Question() {
            Id = 2,
            Text = "How are you doing today?",
            Tags = new List<Tag>() { Tags[0] }
        },
        new Question() {
            Id = 3,
            Text = "What are the best hobbies?",
            Tags = new List<Tag>() { Tags[1] }
        },
        new Question() {
            Id = 4,
            Text = "Best piece of tech you ever purchaised?",
            Tags = new List<Tag>() { Tags[3] }
        },
        new Question() {
            Id = 5,
            Text = "Local band looking for new members. Anyone interested?",
            Tags = new List<Tag>() { Tags[4] }
        }
    };

    public static List<(int QuestionId, int TagId)> QuestionsTags = new List<(int QuestionId, int TagId)>() {
        (1, 3), (2, 1), (3, 2), (4, 4), (5, 5)
    };

    [HttpPut(Name = "AddQuestion")]
    public async Task<ActionResult> AddQuestion(AddQuestionRequest request)
    {
        var id = Questions.Any() 
            ? Questions.MaxBy(q => q.Id).Id + 1
            : 1;

        var tags = new List<Tag>();

        foreach (var tagId in request.TagIds) {
            QuestionsTags.Add((id, tagId));
            tags.Add(Tags.FirstOrDefault(t => t.Id == tagId));
        }

        Questions.Add(new Question {
            Id = id,
            Text = request.Question,
            Tags = tags
        });

        return Ok();
    }

    [HttpPost(Name ="GetQuestions")]
    public async Task<ActionResult<List<Question>>> GetQuestions(GetQuestionsRequest request)
    {
        var res = new List<Question>();

        if (request.TagIds.Any()) {
            foreach (var pair in QuestionsTags) {
                if (request.TagIds.Contains(pair.TagId)) {
                    res.Add(Questions.FirstOrDefault(q => q.Id == pair.QuestionId));
                }
            }
        }
        else {
            foreach (var question in Questions) {
                res.Add(question);
            }
        }

        return Ok(res);
    }

    [HttpPost(Name ="GetQuestion")]
    public async Task<ActionResult<List<Question>>> GetQuestion(GetQuestionRequest request)
    {
        return Ok(Questions.FirstOrDefault(q => q.Id == request.QuestionId));
    }

    [HttpPut(Name = "AddAnswer")]
    public async Task<ActionResult> AddAnswer(AddAnswerRequest request)
    {
        var id = Answers.Any()
            ? Answers.MaxBy(q => q.Id).Id + 1
            : 1;

        var newAnswer = new Answer {
            Id = id,
            Text = request.AnswerText,
            QuestionId = request.QuestionId
        };

        Answers.Add(newAnswer);

        return Ok(newAnswer);
    }

    [HttpPost(Name = "GetAnswers")]
    public async Task<ActionResult<List<Answer>>> GetAnswers(GetAnswersRequest request)
    {
        var res = new List<Answer>();

        foreach (var answer in Answers) {
            if (request.QuestionId == answer.QuestionId) {
                res.Add(answer);
            }
        }

        return Ok(res);
    }

    [HttpPost(Name = "EditAnswer")]
    public async Task<ActionResult> EditAnswer(EditAnswerRequest request)
    {
        var answer = Answers.FirstOrDefault(a => a.Id == request.AnswerId);
        answer.Text = request.AnswerText;
        return Ok();
    }

    [HttpDelete(Name = "DeleteAnswer")]
    public async Task<ActionResult> DeleteAnswer(DeleteAnswerRequest request)
    {
        var answer = Answers.FirstOrDefault(a => a.Id == request.AnswerId);
        Answers.Remove(answer);
        return Ok();
    }

    [HttpGet(Name = "GetTags")]
    public async Task<ActionResult> GetTags()
    {
        return Ok(Tags);
    }

}

public class AddQuestionRequest {
    public string Question { get; set; }
    public int[] TagIds { get; set; }
}

public class GetQuestionsRequest {
    public int[] TagIds { get; set; }
}

public class GetQuestionRequest {
    public int QuestionId { get; set; }
}

public class AddAnswerRequest {
    public int QuestionId { get; set; }
    public string AnswerText { get; set; }
}

public class GetAnswersRequest {
    public int QuestionId { get; set; }
}

public class EditAnswerRequest {
    public int AnswerId { get; set; }
    public string AnswerText { get; set; }
}

public class DeleteAnswerRequest {
    public int AnswerId { get; set; }
}