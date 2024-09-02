namespace Portfolio.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Role { get; set; }
        public List<string> Technologies { get; set; }
        public TimeSpan Duration { get; set; }
        public string Challenge { get; set; }
        public string Resulte { get; set; }
        public string Link { get; set; }
    }
}
